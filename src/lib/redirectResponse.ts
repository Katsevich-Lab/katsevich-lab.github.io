export function redirectResponse(destination: string, label: string) {
  const escapedDestination = destination.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  const escapedLabel = label.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Page moved — Katsevich Lab</title>
    <meta name="robots" content="noindex, follow">
    <meta http-equiv="refresh" content="0; url=${escapedDestination}">
    <link rel="canonical" href="https://katsevich-lab.github.io${escapedDestination}">
  </head>
  <body><main><h1>This page has moved</h1><p>Continue to <a href="${escapedDestination}">${escapedLabel}</a>.</p></main></body>
</html>`;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex"
    }
  });
}
