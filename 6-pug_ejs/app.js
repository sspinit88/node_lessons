const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// подключаем ejs
app.set('view engine', 'ejs');
// указываем папку с шаблонами
app.set('views', 'views');


// const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404)
    .render(
      '404', {
        pageTitle: 'Page Not Found',
      }
    );
});

app.listen(3000);
