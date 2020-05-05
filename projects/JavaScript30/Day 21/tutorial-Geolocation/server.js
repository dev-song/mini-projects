// NodeJS 서버 구동용 JavaScript
var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request, response) {
    var url = request.url;
    if(request.url == '/') {
        url = '/index.html';
    }
    if(request.url == '/favicon.ico') {
        return response.writeHead(404);
    }
    response.writeHead(200);
    
    // __dirname: file directory
    // url: user requested url
    // readFileSync(): nodeJS feature to read local files
    // response.end(content): response to user with content
    response.end(fs.readFileSync(__dirname + url));
    console.log('Server is running');
});

app.listen(3000);