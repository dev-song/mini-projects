const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const requestedUrl = req.url;
  console.log(req.url);
  let responseUrl;
  if (requestedUrl === '/') {
    responseUrl = '/index.html';
  }
  if (requestedUrl === '/admin') {
    responseUrl = '/admin.html';
  }
  if (!responseUrl) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200);
  res.end(fs.readFileSync(__dirname + responseUrl));
})

server.listen(4096);