const passport = require('passport');
const { Strategy } = require('passport-local')
const Dropbox = require('dropbox')
const bcrypt = require('bcrypt-nodejs')


let dbx
let usuarios = []

function inicializar (config) {
  return new Promise((res, rej) => {
    dbx.filesDownload({path: '/usuarios.json'}).then(data => {
      res(JSON.parse(data.fileBinary))
    }).catch(err => {
      // No existe usuarios.json, hay que crearlo
      let users = config.Local.lectores.map(lector => ({email: lector, password: bcrypt.hashSync('1234')}))
      let json = JSON.stringify(users, undefined, 2)
      dbx.filesUpload({contents: json, path: "/usuarios.json", mode: {".tag": "overwrite"}}).then(() => {
        res(users)
      }).catch(console.error)
    })
  })
}

const strategy = (config) => {
  console.log(config)
  console.log(config.Local.token)
  dbx = new Dropbox({ accessToken: config.Local.token })
  inicializar(config).then(users => usuarios = users)

  return new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    let usuario = usuarios.find(usr => usr.email === email)
    if (usuario) {
      // verificar la contraseña
      if (bcrypt.compareSync(password, usuario.password)) {
        //if(contraseña es 1234)
        usuario.auth = 'Local'
        return done(null, usuario)
      } else {
        return done(null, false)
      }
    } else {
      return done(null, false)
    }
  })
}

const login = () => {
  const router = require('express').Router()
  router.get('/login/password', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login')
    console.log(req.user)
    console.log(req.user.email)
    res.render('reg', req.user)
  })

  router.post('/login/password', (req, res) => {
    if (bcrypt.compareSync(req.body.OldPassword, req.user.password)) {
      if (req.body.NewPass === req.body.ConfirmPass) {
        let usuario = usuarios.find(usr => usr.email === req.user.email)
        usuario.password = bcrypt.hashSync(req.body.NewPass)

        let json = JSON.stringify(usuarios, undefined, 2)
        dbx.filesUpload({contents: json, path: "/usuarios.json", mode: {".tag": "overwrite"}}).then(() => {
          res.send('Todo correcto, amigo')
        }).catch((err) => {
          console.log(err)
          res.send(err)
        })
        return
      }
    }
    res.redirect('/login/password')
  })

  router.post('/login/local', passport.authenticate('local', {failureRedirect : '/login'}), (req, res) => res.redirect('/'));

  return router
}

const middleware = () => (req, res, next) => next()

module.exports = {
  strategy,
  login,
  middleware
}
