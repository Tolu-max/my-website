const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const CANONICAL_HOST = 'toluoyelola.cv';
const WWW_HOST = `www.${CANONICAL_HOST}`;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  const requestHost = (req.headers.host || '').split(':')[0].toLowerCase();
  if (requestHost === WWW_HOST) {
    const canonicalUrl = new URL(req.url || '/', `https://${CANONICAL_HOST}`);
    canonicalUrl.protocol = 'https:';
    canonicalUrl.hostname = CANONICAL_HOST;
    canonicalUrl.port = '';
    res.writeHead(308, {
      Location: canonicalUrl.href,
      'Cache-Control': 'public, max-age=86400',
    });
    res.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad Request');
    return;
  }

  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.resolve(ROOT, relativePath);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  let targetFile = null;
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) targetFile = filePath;
    else if (stats.isDirectory()) {
      if (fs.existsSync(filePath + '.html')) targetFile = filePath + '.html';
      else if (fs.existsSync(path.join(filePath, 'index.html'))) targetFile = path.join(filePath, 'index.html');
    }
  } else if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    targetFile = filePath + '.html';
  }

  if (!targetFile) {
    const notFoundPath = path.join(ROOT, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.existsSync(notFoundPath) ? fs.readFileSync(notFoundPath) : '404 Not Found');
    return;
  }

  const contentType = MIME_TYPES[path.extname(targetFile).toLowerCase()] || 'application/octet-stream';
  fs.readFile(targetFile, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server listening on port ${PORT}`);
});
