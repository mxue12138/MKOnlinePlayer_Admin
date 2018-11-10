let express = require('express');
let router = express.Router();

let index = require(process.cwd() + '/modules/index');
let player = require(process.cwd() + '/modules/player');

router.get('/', (req, res) => {
  index(req, res);
});

router.get('/js/player.js', (req, res) => {
  player(req, res);
});

module.exports = router;