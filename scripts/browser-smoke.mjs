import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const routes = ["/", "/research/", "/people/", "/software/", "/publications/", "/join/"];
const port = 4329;
const origin = `http://127.0.0.1:${port}`;
const failures = [];

const chromeCandidates = [
  process.env.SITE_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable"
].filter(Boolean);
const executablePath = chromeCandidates.find((path) => existsSync(path));

if (!executablePath) {
  throw new Error("Chrome was not found. Set SITE_CHROME_PATH to a Chrome or Chromium executable.");
}

const astroCli = join(process.cwd(), "node_modules", "astro", "bin", "astro.mjs");
const server = spawn(process.execPath, [astroCli, "preview", "--host", "127.0.0.1", "--port", String(port)], {
  stdio: ["ignore", "pipe", "pipe"]
});
let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk; });
server.stderr.on("data", (chunk) => { serverOutput += chunk; });

const waitForServer = async () => {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Preview server did not start.\n${serverOutput}`);
};

const browser = await chromium.launch({ executablePath, headless: true });

try {
  await waitForServer();

  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 320, height: 900 }, reducedMotion: "reduce" });
    const runtimeErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
    });
    page.on("pageerror", (error) => runtimeErrors.push(`page: ${error.message}`));
    await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });

    const metrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1Count: document.querySelectorAll("h1").length,
      mainCount: document.querySelectorAll("main").length,
      missingAltCount: document.querySelectorAll("img:not([alt])").length,
      mainTabIndex: document.querySelector("#main-content")?.getAttribute("tabindex")
    }));
    if (metrics.scrollWidth !== metrics.clientWidth) {
      failures.push(`${route} overflows at 320px (${metrics.scrollWidth}px scroll width vs ${metrics.clientWidth}px client width)`);
    }
    if (metrics.h1Count !== 1) failures.push(`${route} has ${metrics.h1Count} H1 elements in the browser`);
    if (metrics.mainCount !== 1) failures.push(`${route} has ${metrics.mainCount} main landmarks in the browser`);
    if (metrics.missingAltCount) failures.push(`${route} has ${metrics.missingAltCount} images without alt attributes`);
    if (metrics.mainTabIndex !== "-1") failures.push(`${route} main content is not programmatically focusable`);

    await page.addScriptTag({ content: axeSource });
    const axeViolations = await page.evaluate(async () => {
      const results = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }
      });
      return results.violations
        .filter((violation) => violation.impact === "critical" || violation.impact === "serious")
        .map((violation) => `${violation.id} (${violation.nodes.map((node) => node.target.join(" ")).join(", ")})`);
    });
    axeViolations.forEach((violation) => failures.push(`${route} axe: ${violation}`));
    runtimeErrors.forEach((error) => failures.push(`${route} ${error}`));
    await page.close();
  }

  const interactionPage = await browser.newPage({ viewport: { width: 320, height: 900 }, reducedMotion: "reduce" });
  await interactionPage.goto(origin, { waitUntil: "networkidle" });
  await interactionPage.keyboard.press("Tab");
  if (!(await interactionPage.locator(".skip-link").evaluate((element) => element === document.activeElement))) {
    failures.push("The skip link is not the first keyboard focus target");
  }
  await interactionPage.keyboard.press("Enter");
  await interactionPage.waitForTimeout(50);
  if ((await interactionPage.evaluate(() => document.activeElement?.id)) !== "main-content") {
    failures.push("Activating the skip link does not focus main content");
  }
  await interactionPage.keyboard.press("Tab");
  if (!(await interactionPage.evaluate(() => Boolean(document.activeElement?.closest("main"))))) {
    failures.push("Tabbing after the skip link does not enter the main content controls");
  }

  const menuButton = interactionPage.locator(".mobile-menu summary");
  await menuButton.click();
  await interactionPage.waitForFunction(() => document.querySelector(".mobile-menu summary")?.getAttribute("aria-label") === "Close navigation");
  if ((await menuButton.getAttribute("aria-expanded")) !== "true" || (await menuButton.getAttribute("aria-label")) !== "Close navigation") {
    failures.push("The open mobile menu does not expose its state and Close navigation label");
  }
  await interactionPage.keyboard.press("Escape");
  await interactionPage.waitForFunction(() => document.querySelector(".mobile-menu summary")?.getAttribute("aria-label") === "Open navigation");
  if ((await menuButton.getAttribute("aria-expanded")) !== "false" || (await menuButton.getAttribute("aria-label")) !== "Open navigation") {
    failures.push("The closed mobile menu does not reset its state and Open navigation label");
  }
  if (!(await menuButton.evaluate((element) => element === document.activeElement))) {
    failures.push("Closing the mobile menu with Escape does not restore focus");
  }

  await interactionPage.goto(`${origin}/publications/`, { waitUntil: "networkidle" });
  await interactionPage.getByRole("button", { name: "Perturb-seq", exact: true }).click();
  const countText = await interactionPage.locator("#publication-count").innerText();
  if (!/Showing \d+ of \d+ works/.test(countText) || !interactionPage.url().includes("theme=Perturb-seq")) {
    failures.push("The publication theme filter does not update both count and shareable URL");
  }
  await interactionPage.close();

  const captureDirectory = process.env.SITE_CAPTURE_DIR;
  if (captureDirectory) {
    mkdirSync(captureDirectory, { recursive: true });
    for (const route of routes) {
      const slug = route === "/" ? "home" : route.split("/").filter(Boolean)[0];
      for (const [label, viewport] of [["desktop", { width: 1440, height: 1000 }], ["mobile", { width: 320, height: 900 }]]) {
        const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
        await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
        await page.screenshot({ path: join(captureDirectory, `${slug}-${label}.png`), fullPage: true });
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
  server.kill("SIGTERM");
}

if (failures.length) {
  console.error(`Browser verification failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Browser verification passed: ${routes.length} pages at 320px, axe WCAG smoke checks, skip link, mobile navigation, and publication filters.`);
