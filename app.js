const http = require('http');

const requestHandler = require('./myRoutes');

const server = http.createServer(requestHandler);

server.listen(3555);