const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {

  const { url } = req;

  if (url === '/') {
    const test = { 1: 'one', 2: 'two', 3: 'three'};
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(test));
    res.end();
  }

  console.log(url);

  res.end('Welcome to Node!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`)
});
