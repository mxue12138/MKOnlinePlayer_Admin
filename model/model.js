let mongoose = require('mongoose');

mongoose.set('debug', config.debug);
mongoose.connect('mongodb://' + config.datahost + ':' + config.dataport + '/' + config.database, { useNewUrlParser: true });

let indexSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: String,
  logo_text: String,
  footer: String,
  notice_show: Boolean,
  notice: String
})

let listSchema = new mongoose.Schema({
  name: String,
  cover: String,
  creatorName: String,
  creatorAvatar: String,
  // item: Array,
  id: Number,
  type: String
}, {
  versionKey: false
})

let playerSchema = new mongoose.Schema({
  api: String,
  loadcount: Number,
  method: String,
  defaultlist: Number,
  autoplay: Boolean,
  coverbg: Boolean,
  mcoverbg: Boolean,
  dotshine: Boolean,
  mdotshine: Boolean,
  volume: Number,
  version: String,
  debug: Boolean
})

let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean
})

module.exports = {
  indexModel: mongoose.model('indexes', indexSchema),
  listModel: mongoose.model('lists', listSchema),
  playerModel: mongoose.model('players', playerSchema),
  userModel: mongoose.model('users', userSchema)
}
