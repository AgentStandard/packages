import http from 'http';
import fs from 'fs';

const html = fs.readFileSync('./preview.html', 'utf8');
const v1 = fs.readFileSync('./logo-v1.svg', 'utf8');
const v2 = fs.readFileSync('./logo-v2.svg', 'utf8');
const v3 = fs.readFileSync('./logo-v3.svg', 'utf8');

const b64 = s => 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64');

const page = html
  .replaceAll('logo-v1.svg', b64(v1))
  .replaceAll('logo-v2.svg', b64(v2))
  .replaceAll('logo-v3.svg', b64(v3));

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(page);
}).listen(7843, () => console.log('Logo preview: http://127.0.0.1:7843'));
