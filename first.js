const http = require('http');
const server = http.createServer((req, res) => {
      console.log(req.url, req.method, req.headers);
      res.setHeader('constent-type','text/html');
      res.write('<html>');
      res.write('<head><title>ADITI FIRST PAGE</title></head>');
      res.write('<body><h1>hello aditi from my Node.js server!</h1></body>');
      res.write('</html');
      res.end();
}
);
server.listen(3000);