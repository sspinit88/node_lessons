// createServer() - метод создания сервера, принимает в себя 2-м параметром слушаетля, который бедет отрабатывать
// каждый раз, когда приходит запрос на сервер.

// server.listen(); - вешаем прослушивателья на сервер.
// process.exit(); - прерывает цикл обработки событий.

// res.setHeader('Content-Type', 'text/html'); - в ответе передаем хефдер, с именем и значением (говорим, что
// передаем текст в виде html).

// res.write(); - позволяет сделать запись в ответе.
// res.end(); - говорим, что закончили запись.

const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // process.exit();
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first page</title></head>');
  res.write('<body><h1>Hello, from my node.js server! ;-)</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);