const passport = require('passport');
const { Strategy } = require('passport-local')

const strategy = (config) => {
  /*
  let {
    username,
    password
  } = config*/

  return new Strategy((username, password, done) => {
    /*
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
      });
    }*/
    if (username === 'pedro' && password === 'password') {
      return done(null, {username: 'pedro', password: 'password'})
    } else {
      return done(null, false)
    }
  })
}

const login = () => {
  const router = require('express').Router()

  router.post('/login/local', passport.authenticate('local', {failureRedirect : '/login'}));

  return router
}

const middleware = () => (req, res, next) => next()

module.exports = {
  strategy,
  login,
  middleware
}