const http = require('http');
const routes = require('./routes');

// 1й вариант
// const server = http.createServer(routes);

// 2й и 3й вариант
const server = http.createServer(routes.handler);

server.listen(3000);