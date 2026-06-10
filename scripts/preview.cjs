// Minimal static server for the Next.js export in out/ (trailingSlash mode).
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2];
const PORT = Number(process.argv[3] || 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.endsWith("/")) p += "index.html";
    let file = path.join(ROOT, p);
    if (!fs.existsSync(file)) {
      const asHtml = path.join(ROOT, p + ".html");
      file = fs.existsSync(asHtml) ? asHtml : path.join(ROOT, "404.html");
    }
    try {
      const data = fs.readFileSync(file);
      res.writeHead(200, {
        "content-type": MIME[path.extname(file)] || "application/octet-stream",
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  })
  .listen(PORT, () => console.log("serving on " + PORT));
