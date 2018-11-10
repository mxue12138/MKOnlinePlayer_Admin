let express = require('express');
let router = express.Router();

let music_list = require(process.cwd() + '/modules/admin/api/music_list')
let index = require(process.cwd() + '/modules/admin/api/index');
let login = require(process.cwd() + '/modules/admin/api/login');
let logout = require(process.cwd() + '/modules/admin/api/logout');

router.post('/music_list', (req, res) => {
  music_list(req, res);
});

router.post('/index', (req, res) => {
  index(req, res);
});

router.post('/login', (req, res) => {
  login(req, res);
});

router.post('/logout', (req, res) => {
  logout(req, res);
});

module.exports = router;