const passport = require('passport');
const { Strategy } = require('passport-github')
const github = require ('octonode')
let client // Guardar el cliente para usarlo posteriormente

const strategy = (config) => {
  let {
    host,
    clientID,
    clientSecret,
  } = config

  client = github.client({id: clientID, secret: clientSecret})

  return new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: `${host}/login/github/return`
  },
  (accessToken, refreshToken, profile, cb) => cb(null, profile))
}

const login = () => {
  const router = require('express').Router()

  router.get('/login/github', passport.authenticate('github'));

  router.get('/login/github/return',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    });

  return router
}

const middleware = ({ organizacion }) => {
  return (req, res, next) => {
    client.get(`/users/${req.user.username}/orgs`, {}, function (err, status, body, headers) {
      for(let org of body) {
        if (org.login === organizacion) {
          return next()
        }
      }
      res.render('error', {error: 'No tienes permisos para ver el libro'})
    });
  }
}

module.exports = {
  strategy,
  login,
  middleware
}