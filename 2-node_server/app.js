const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><form action="/message" method="post"><input type="text" name="message"><button' +
        ' type="submit">send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    // создаем прослушивателя событий
    // 1й - что слушаем, 2й - функция, которая должна выполняться для каждого входящего фрагмента данных.
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    // выключаем слушателя, как только закончился поток обрабатываемых данных
    req.on('end', () => {
      // отправляем данные в буфер, для обеспечения возможность работать с ними
      // обращаемся к буферу и конкатенируем все пришедшие в body части
      const parsetBody = Buffer.concat(body).toString();
      // полученную строк превращаем в массив, разбивая по '='.
      const message = parsetBody.split('=')[1];
      // записываем message (по name) в файл
      fs.writeFileSync('message.txt', message);
    });
    // устанавливаем статус запроса
    res.statusCode = 302;
    // перенаправляем на адрес
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first page</title></head>');
  res.write('<body><h1>Hello, from my node.js server! ;-)</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);