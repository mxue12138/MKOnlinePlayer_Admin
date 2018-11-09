let express = require('express');
let router = express.Router();
let music_list = require(process.cwd() + '/tools/music_list');
let index = require(process.cwd() + '/tools/index');
let user = require(process.cwd() + '/data/user.json');

router.get('/', (req, res) => {
  res.redirect('/admin/index.html');
});

router.get('/index.html', (req, res) => {
  if (req.cookies.username == user.username && req.cookies.password == user.password) {
    res.render('admin/index', {
      music_list: music_list.read(),
      index: index.read()
    });
  } else {
    res.redirect('/admin/login.html');
  }
});

router.get('/login.html', (req, res) => {
  res.render('admin/login');
});

module.exports = router;