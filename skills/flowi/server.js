#!/usr/bin/env node

// Flowy Dev Server - Serves interactive diagram viewer with live-reload
// Usage: node ~/.claude/skills/flowi/server.js [port] [flowi-dir]
// Defaults: port=3333, flowi-dir=./.flowi

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = parseInt(process.argv[2]) || 3333;
const FLOWY_DIR = path.resolve(process.argv[3] || "./.flowi");
const VIEWER_HTML = path.join(__dirname, "index.html");

// Track connected SSE clients for live-reload
const clients = new Set();

function sendEvent(data) {
  for (const res of clients) {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}

// Watch .flowi directory for changes
function watchFlowyDir() {
  if (!fs.existsSync(FLOWY_DIR)) {
    fs.mkdirSync(FLOWY_DIR, { recursive: true });
    console.log(`Created ${FLOWY_DIR}`);
  }

  let debounce = null;
  fs.watch(FLOWY_DIR, { recursive: false }, (eventType, filename) => {
    if (!filename || !filename.endsWith(".json")) return;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      console.log(`[flowi] ${eventType}: ${filename}`);
      sendEvent({ type: "reload", file: filename });
    }, 100);
  });

  console.log(`Watching ${FLOWY_DIR} for changes...`);
}

// Read all diagram JSON files
function getDiagrams() {
  if (!fs.existsSync(FLOWY_DIR)) return [];
  return fs
    .readdirSync(FLOWY_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const content = fs.readFileSync(path.join(FLOWY_DIR, f), "utf-8");
        return { filename: f, ...JSON.parse(content) };
      } catch (e) {
        return { filename: f, error: e.message };
      }
    });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:${PORT}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // SSE endpoint for live-reload
  if (url.pathname === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("data: {\"type\":\"connected\"}\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  // API: list all diagrams
  if (url.pathname === "/api/diagrams" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getDiagrams()));
    return;
  }

  // API: save a diagram
  if (url.pathname.startsWith("/api/diagrams/") && req.method === "PUT") {
    const filename = decodeURIComponent(url.pathname.split("/").pop());
    if (!filename.endsWith(".json")) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Filename must end with .json" }));
      return;
    }
    const filepath = path.resolve(FLOWY_DIR, filename);
    if (!filepath.startsWith(path.resolve(FLOWY_DIR) + path.sep)) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid filename" }));
      return;
    }
    let body = "";
    let size = 0;
    let responseSent = false;
    const MAX_BODY = 1024 * 1024; // 1MB
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        responseSent = true;
        res.writeHead(413, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Request too large" }));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on("end", () => {
      if (responseSent) return;
      try {
        const data = JSON.parse(body);
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
        console.log(`[flowi] Saved: ${filename}`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Serve viewer HTML
  if (url.pathname === "/" || url.pathname === "/index.html") {
    try {
      const html = fs.readFileSync(VIEWER_HTML, "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch (e) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Could not load viewer: " + e.message);
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`\n  Flowy Viewer running at http://localhost:${PORT}`);
  console.log(`  Watching: ${FLOWY_DIR}\n`);
  watchFlowyDir();
});
