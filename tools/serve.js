#!/usr/bin/env node
// Minimal static file server for trying the browser examples:
//   node tools/serve.js [port]   →   http://localhost:5178/examples/browser/
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const port = Number(process.argv[2] || process.env.PORT || 5178);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };

http.createServer((request, response) => {
    const urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = path.join(root, urlPath);
    if (!file.startsWith(root)) {
        response.writeHead(403).end();
        return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    fs.readFile(file, (error, data) => {
        if (error) {
            response.writeHead(404).end("Not found");
            return;
        }
        response.writeHead(200, { "Content-Type": `${types[path.extname(file)] || "application/octet-stream"}; charset=utf-8` });
        response.end(data);
    });
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}/examples/browser/`));
