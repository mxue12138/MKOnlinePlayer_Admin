let express = require('express');
let router = express.Router();
let index = require(process.cwd() + '/tools/index');

router.get('/', (req, res) => {
  res.render('index', { data: index.read() });
});

module.exports = router;