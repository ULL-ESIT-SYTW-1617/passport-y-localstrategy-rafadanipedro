const dropbosee = require('../authentication/dropbox')

class User extends dropbosee.Schema {
  constructor(params) {
    let user = {
      email: params.email,
      password: params.password
    }

    super(user, 'User')
  }
}

User.findById = (id) => {
  return dropbosee.findByIdRaw('User', id)
}

User.find = (params) => {
  return dropbosee.findRaw('User', params)
}

User.findOne = (params) => {
  return dropbosee.findOneRaw('User', params)
}

User.findOneUpdate = (params, mod) => {
  return dropbosee.findOneUpdateRaw('User', User, params, mod)
}

module.exports = User

/*

Como hacer una conexión con dropbosee

dropbosee.connect('gcIDmUe91mMAAAAAAAA9BNTsNxfaUGZ_gr_GrmjNKUT-mHiQ8NqSoYbcb_iJQXyf').then(() => {
  console.log('Conectado con la base de datos!!')


  let user = new User({email: 'rafa@rafa.com', password: '1234'})

  user.save().then(() => {
    User.find().then(console.log)
  })
})*/