let music_list = require(process.cwd() + '/tools/music_list');
let index = require(process.cwd() + '/tools/index');
let player = require(process.cwd() + '/data/player.json');
let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  if(token(req) == 1) {
    res.render('admin/index', {
      music_list: music_list.read(),
      index: index.read(),
      player: player
    });
  } else {
    res.redirect('/admin/login.html');
  }
}