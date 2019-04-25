const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const
  //   isLoggedIn = req
  //     .get('Cookie')
  //     .split(';')[1]
  //     .trim()
  //     .split('=')[1];

  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuth: false,
  });
};

// exports.postLogin = (req, res, next) => {
  // устанавливаем заголовок нашего ответа

  // -> res.setHeader('Set-Cookie', 'loggedIn=true; Expires=');

  // Expires - устанавливает срок жизни печеньки
  // ВDomain= - устанавливает домен, на который будет отправлена печенька
  // Secure - файл куки будет установлен, если используется только HTTPS
  // Max-Age=секунды - срок жизни в секундах
  // HttpOnly - доступ к файлу печеньки получаем только через Http
  // res.setHeader('Set-Cookie', 'loggedIn=true');

  // далее работаем с сессией
//   req.session.isLoggedIn = true;
//   res.redirect('/');
// };

exports.postLogin = (req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(() => {
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  //  уничтожаем сессию
  req.session.destroy(
    err => {
      console.log(err);
      res.redirect('/')
    });
};
