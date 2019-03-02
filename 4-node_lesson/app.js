// next(); - обеспечивает переход к следуюшей функции
// res.send(); -  отправка ответа
// body-parser - модуль, обрабатывает тела запросов и выставляет для них req.body
// urlencoded - именно с помощью этого метода и анализируется тело
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 и страница не найдена
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);