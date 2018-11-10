let express = require('express');
let router = express.Router();

let index = require(process.cwd() + '/modules/index');

router.get('/', (req, res) => {
  index(req, res);
});

module.exports = router;