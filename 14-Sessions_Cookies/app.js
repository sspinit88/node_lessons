const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5cbe34983bc3053b1ec0259b')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://administrator:cGA9G85DZ3JIbscA@cluster0-1gboc.mongodb.net/shop?retryWrites=true',
    {useNewUrlParser: true}
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        // создаем подльзователя
        const user = new User({
          name: 'Serge',
          email: 'sbassamskiff@mail.ru',
          cart: {
            items: [],
          }
        });
        user.save();
      }
    });


    app.listen(3001);
  })
  .catch(err => console.log(err));

