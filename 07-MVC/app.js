const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// подключаем ejs
app.set('view engine', 'ejs');
// указываем папку с шаблонами
app.set('views', 'views');

const notFoundController = require('./controllers/404-controller');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.notFoundPage);

app.listen(3000);
