const
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  mongodbSession = require('connect-mongodb-session')(session);

const
  errorController = require('./controllers/error'),
  User = require('./models/user'),
  MONGODB_URL = 'mongodb+srv://administrator:cGA9G85DZ3JIbscA@cluster0-1gboc.mongodb.net/shop?retryWrites=true';

const
  app = express(),
  store = new mongodbSession({
    uri: MONGODB_URL,
    collection: 'sessions'
  });

app.set('view engine', 'ejs');
app.set('views', 'views');

const
  adminRoutes = require('./routes/admin'),
  shopRoutes = require('./routes/shop'),
  authRouter = require('./routes/auth');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// подключаем сессии
app.use(
  session({
    // secret - используетсяя для подписи хеша, который тайно хранит наш id в куке
    secret: 'my secret',
    // resave: false - сеанс не будет сохраняться при каждом выполнении запроса, только при изменениях в сеансе
    resave: false,
    // saveUninitialized: false - неодин из сеансов не будет сохранен для запроса
    saveUninitialized: false,
    // тутже можно настроить куки
    // cookie: {maxAge: ...},

    // подключаем
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
      return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
     next();
    })
    .catch(err => console.log(err));
});

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
app.use(authRouter);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URL,
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

    app.listen(3000);
  })
  .catch(err => console.log(err));

