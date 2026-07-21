const routes = ["/", "/research/", "/people/", "/software/", "/publications/", "/join/"];

export function GET() {
  const urls = routes
    .map((route) => `<url><loc>https://katsevich-lab.github.io${route}</loc></url>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
