const fs = require('fs');

const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write(`<body>
                 <form action="/message" method="post">
                    <input type="text" name="message">
                    <button type="submit">send</button>
                 </form>
               </body>`);
    res.write('</html>');
    return res.end();
  }
  else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
      console.log(body);
    });
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const itemMessage = parseBody.split('=')[1];
      fs.writeFile('message.txt', itemMessage, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first page</title></head>');
  res.write('<body><h1>Hello, from my node.js server! ;-)</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = reqHandler;