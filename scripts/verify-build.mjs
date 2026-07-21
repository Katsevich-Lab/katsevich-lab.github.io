import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const rootPath = new URL("../dist/", import.meta.url).pathname;
const siteOrigin = "https://katsevich-lab.github.io";
const failures = [];

const canonicalRoutes = new Map([
  ["index.html", "/"],
  ["research/index.html", "/research/"],
  ["people/index.html", "/people/"],
  ["software/index.html", "/software/"],
  ["publications/index.html", "/publications/"],
  ["join/index.html", "/join/"]
]);

const redirectRoutes = new Map([
  ["team/index.html", "/people/"],
  ["vacancies/index.html", "/join/"],
  ["allnews/index.html", "/"],
  ["pictures/index.html", "/people/"],
  ["aboutwebsite.html", "/"],
  ["allnews.html", "/"],
  ["aoa.html", "/"]
]);

const requiredOutputs = [
  ...canonicalRoutes.keys(),
  ...redirectRoutes.keys(),
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "og.png",
  "favicon.png",
  "apple-touch-icon.png",
  "files/CV_Eugene_Katsevich.pdf"
];

const fail = (message) => failures.push(message);
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const readOutput = (output) => readFileSync(join(rootPath, output), "utf8");

for (const output of requiredOutputs) {
  if (!existsSync(join(rootPath, output))) fail(`Missing required output: ${output}`);
}

const walk = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const outputFiles = existsSync(rootPath) ? walk(rootPath) : [];
const textFiles = outputFiles.filter((file) => /\.(html|xml|txt|js|css)$/i.test(file));
const forbidden = [
  /Allan Lab/i,
  /Leiden University/i,
  /milan\.allan/i,
  /UA-82472331-1/i,
  /condensed matter physics/i,
  /Electron Pair Microscopy/i,
  /GeneralPostdoc_2019/i
];

for (const file of textFiles) {
  const content = readFileSync(file, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(content)) fail(`Forbidden legacy content ${pattern} in ${relative(rootPath, file)}`);
  }
}

const validatePageSemantics = (output, html) => {
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const mainCount = (html.match(/<main(?:\s|>)/gi) ?? []).length;
  if (h1Count !== 1) fail(`${output} has ${h1Count} H1 elements; expected 1`);
  if (mainCount !== 1) fail(`${output} has ${mainCount} main landmarks; expected 1`);
  if (!/<main[^>]*id="main-content"[^>]*tabindex="-1"/i.test(html)) {
    fail(`${output} is missing the focusable main-content target`);
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) fail(`${output} has duplicate IDs: ${duplicateIds.join(", ")}`);

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/(?:^|\s)alt(?:=|\s|$)/i.test(match[1])) fail(`${output} contains an image without alt text`);
  }

  const headingLevels = [...html.matchAll(/<h([1-6])(?:\s|>)/gi)].map((match) => Number(match[1]));
  headingLevels.slice(1).forEach((level, index) => {
    if (level > headingLevels[index] + 1) fail(`${output} skips from H${headingLevels[index]} to H${level}`);
  });
};

for (const [output, route] of canonicalRoutes) {
  const path = join(rootPath, output);
  if (!existsSync(path)) continue;
  const html = readOutput(output);
  const expectedUrl = `${siteOrigin}${route}`;
  const assertions = [
    [/<title>[^<]+<\/title>/i, "title"],
    [/<meta name="description" content="[^"]+"/i, "description"],
    [new RegExp(`<link rel="canonical" href="${escapeRegExp(expectedUrl)}">`, "i"), `canonical URL ${expectedUrl}`],
    [new RegExp(`<meta property="og:url" content="${escapeRegExp(expectedUrl)}">`, "i"), `Open Graph URL ${expectedUrl}`],
    [new RegExp(`<meta property="og:image" content="${escapeRegExp(siteOrigin)}/og\\.png">`, "i"), "Open Graph image"]
  ];
  for (const [pattern, label] of assertions) {
    if (!pattern.test(html)) fail(`${output} is missing ${label}`);
  }

  const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!schemaMatch) {
    fail(`${output} is missing JSON-LD`);
  } else {
    try {
      const schema = JSON.parse(schemaMatch[1]);
      if (schema["@type"] !== "ResearchOrganization" || schema.name !== "Katsevich Lab") {
        fail(`${output} has unexpected organization JSON-LD`);
      }
    } catch {
      fail(`${output} contains invalid JSON-LD`);
    }
  }
  validatePageSemantics(output, html);
}

for (const [output, destination] of redirectRoutes) {
  const path = join(rootPath, output);
  if (!existsSync(path)) continue;
  const html = readOutput(output);
  const expectedCanonical = `${siteOrigin}${destination}`;
  const assertions = [
    [/<meta name="robots" content="noindex, follow">/i, "noindex, follow robots directive"],
    [new RegExp(`<meta http-equiv="refresh" content="0; url=${escapeRegExp(destination)}">`, "i"), `refresh to ${destination}`],
    [new RegExp(`<link rel="canonical" href="${escapeRegExp(expectedCanonical)}">`, "i"), `canonical destination ${expectedCanonical}`],
    [new RegExp(`<a href="${escapeRegExp(destination)}">`, "i"), `fallback link to ${destination}`]
  ];
  for (const [pattern, label] of assertions) {
    if (!pattern.test(html)) fail(`${output} is missing ${label}`);
  }
  if (/noindex, nofollow/i.test(html)) fail(`${output} blocks crawlers from following its destination`);
}

const notFoundPath = join(rootPath, "404.html");
if (existsSync(notFoundPath)) {
  const html = readOutput("404.html");
  if (!/<meta name="robots" content="noindex, nofollow">/i.test(html)) fail("404.html is missing noindex metadata");
  if (/<link rel="canonical"/i.test(html)) fail("404.html should not declare a canonical URL");
  if (/<meta property="og:url"/i.test(html)) fail("404.html should not declare an Open Graph URL");
  validatePageSemantics("404.html", html);
}

const publicationPage = join(rootPath, "publications/index.html");
let publicationCount = 0;
if (existsSync(publicationPage)) {
  const html = readOutput("publications/index.html");
  publicationCount = (html.match(/class="publication-item"/g) ?? []).length;
  const marker = Number(html.match(/data-publication-total="(\d+)"/i)?.[1]);
  if (!Number.isInteger(marker) || marker <= 0) fail("Publication page is missing its generated total marker");
  if (publicationCount !== marker) fail(`Publication marker says ${marker}, but ${publicationCount} records were rendered`);
  if (!html.includes(`All ${marker} works`)) fail("Publication heading does not use the generated total");
  const home = existsSync(join(rootPath, "index.html")) ? readOutput("index.html") : "";
  if (!home.includes(`View all ${marker} works`)) fail("Homepage publication link does not use the generated total");
}

const robotsPath = join(rootPath, "robots.txt");
if (existsSync(robotsPath)) {
  const robots = readOutput("robots.txt");
  for (const directive of ["User-agent: *", "Allow: /", `Sitemap: ${siteOrigin}/sitemap.xml`]) {
    if (!robots.split(/\r?\n/).includes(directive)) fail(`robots.txt is missing: ${directive}`);
  }
}

const sitemapPath = join(rootPath, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const sitemap = readOutput("sitemap.xml");
  const actualUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedUrls = [...canonicalRoutes.values()].map((route) => `${siteOrigin}${route}`);
  for (const url of expectedUrls) if (!actualUrls.includes(url)) fail(`Sitemap missing ${url}`);
  for (const url of actualUrls) if (!expectedUrls.includes(url)) fail(`Sitemap contains unexpected URL ${url}`);
  if (new Set(actualUrls).size !== actualUrls.length) fail("Sitemap contains duplicate URLs");
}

const internalTargets = new Set();
const htmlByRoute = new Map();
for (const file of outputFiles) {
  const rel = relative(rootPath, file);
  internalTargets.add(`/${rel}`);
  if (rel.endsWith("/index.html")) internalTargets.add(`/${rel.replace(/index\.html$/, "")}`);
  if (rel === "index.html") internalTargets.add("/");
  if (!rel.endsWith(".html")) continue;
  const html = readFileSync(file, "utf8");
  htmlByRoute.set(`/${rel}`, html);
  if (rel.endsWith("/index.html")) htmlByRoute.set(`/${rel.replace(/index\.html$/, "")}`, html);
  if (rel === "index.html") htmlByRoute.set("/", html);
}

for (const file of outputFiles.filter((path) => path.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const rel = relative(rootPath, file);
  const currentRoute = rel === "index.html" ? "/" : rel.endsWith("/index.html") ? `/${rel.replace(/index\.html$/, "")}` : `/${rel}`;
  const links = [...html.matchAll(/(?:href|src)="(\/?[^"\s]*)"/g)].map((match) => match[1]);
  for (const rawLink of links) {
    if (!rawLink.startsWith("/") && !rawLink.startsWith("#")) continue;
    const [rawTarget, fragment] = rawLink.split("#", 2);
    const target = rawTarget.split("?")[0] || currentRoute;
    if (!internalTargets.has(target) && !internalTargets.has(`${target}/`) && !internalTargets.has(`${target}/index.html`)) {
      fail(`Broken internal target ${rawLink} referenced by ${rel}`);
      continue;
    }
    if (fragment) {
      const targetHtml = htmlByRoute.get(target) ?? htmlByRoute.get(`${target}/`) ?? htmlByRoute.get(`${target}/index.html`);
      if (targetHtml && !new RegExp(`\\sid="${escapeRegExp(decodeURIComponent(fragment))}"`, "i").test(targetHtml)) {
        fail(`Missing fragment target ${rawLink} referenced by ${rel}`);
      }
    }
  }
}

if (failures.length) {
  console.error(`Build verification failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Build verification passed: ${canonicalRoutes.size} canonical pages, ${redirectRoutes.size} legacy redirects, ${publicationCount} publications, ${outputFiles.length} generated files.`);
