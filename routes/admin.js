let express = require('express');
let router = express.Router();

let index = require(process.cwd() + '/modules/admin/index');
let login = require(process.cwd() + '/modules/admin/login');

router.get('/', (req, res) => {
  res.redirect('/admin/index.html');
});

router.get('/index.html', (req, res) => {
  index(req, res);
});

router.get('/login.html', (req, res) => {
  login(req, res);
});

module.exports = router;
