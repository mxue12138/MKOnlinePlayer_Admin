let express = require('express');
let router = express.Router();
let music_list = require(process.cwd() + '/tools/music_list');
let index = require(process.cwd() + '/tools/index');
let user = require(process.cwd() + '/data/user.json');

router.post('/api/music_list', (req, res) => {
  if (req.body.music_list) {
    music_list.update(req.body.music_list);
    res.json({
      code: 1
    });
  } else {
    res.json({
      code: 0
    });
  }
});

router.post('/api/index', (req, res) => {
  if (req.body.index) {
    index.update(req.body.index);
    res.json({
      code: 1
    });
  } else {
    res.json({
      code: 0
    });
  }
});

router.post('/api/login', (req, res) => {
  if (req.body.username && req.body.password) {
    if (req.body.username == user.username && req.body.password == user.password) {
      res.cookie('username', user.username, {maxAge: 604800000});
      res.cookie('password', user.password, {maxAge: 604800000});
      res.json({
        code: 1
      });
    } else {
      res.json({
        code: 0
      });
    }
  } else {
    res.json({
      code: 0
    });
  }
});

module.exports = router;