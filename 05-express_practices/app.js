const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(
    path.join(rootDir, 'views', '404.html')
  );
});

app.listen(3000);
