const Dropbox = require('dropbox')
const path = '/db.json'

let dbx

function getDB () {
  return new Promise((res, rej) => {
    dbx.filesDownload({ path }).then(data => {
      res(JSON.parse(data.fileBinary))
    }).catch(rej)
  })
}

function uploadDB (data = {}) {
  return new Promise((res, rej) => {
    dbx.filesUpload({contents: JSON.stringify(data, undefined, 2), path, mode: {".tag": "overwrite"}}).then(() => {
      res('Done')
    }).catch(rej)
  })
}

function connect(token) {
  return new Promise((res, rej) => {
    try {
      dbx = new Dropbox({ accessToken: token })
    } catch(err) {
      return rej(err)
    }
    getDB().then(data => {
      res('Conectado a la BBDD!')
    }).catch(() => {
      uploadDB().then(() => {
        res('Conectado a la BBDD!')
      }).catch(rej)
    })
  })
}

class Schema {
  constructor (params, modelName) {
    this.modelName = modelName
    this.params = params
    this.id = parseInt(Math.random()*10000000000000000)
  }

  save () {
    return getDB().then(db => {
      if (!db[this.modelName]) db[this.modelName] = []
      let collection = db[this.modelName]
      let doc = collection.find(doc => doc.id === this.id)
      if (!doc) {
        collection.push({content: this.params, id: this.id})
      } else {
        doc.content = this.params
      }
      return uploadDB(db)
    })
  }
}

function findByIdRaw (modelName, id) {
  return new Promise((res, rej) => {
    getDB().then(db => {
      res(db[modelName].find(doc => doc.id === id))
    }).catch(rej)
  })
}

function findRaw (modelName, params = {}) {
  return new Promise((res, rej) => {
    getDB().then(db => {

      let docs = []

      for (let doc of db[modelName]) {
        let ok = true
        for (let key of Object.keys(params)) {
          if (doc.content[key] !== params[key]) {
            ok = false
            break
          }
        }
        if (ok) {
          docs.push(doc)
        }
      }

      res(docs)
    }).catch(rej)
  })
}

function findOneRaw (modelName, params = {}) {
  return new Promise((res, rej) => {
    findRaw(modelName, params).then(docs => {
      if(!docs.length) return res(null)
      return res(docs[0])
    }).catch(rej)
  })
}

function findOneUpdateRaw (modelName, Child, params, mod) {
  return new Promise((res, rej) => {
    findOneRaw(modelName, params).then(doc => {
      if(doc) {
        for (let key of Object.keys(mod)) {
          doc.content[key] = mod[key]
        }
        let child = new Child(doc.content)
        child.id = doc.id
        child.save().then(res).catch(rej)
      }
    }).catch(rej)
  })
}

module.exports = {
  connect,
  Schema,
  findByIdRaw,
  findRaw,
  findOneRaw,
  findOneUpdateRaw
}