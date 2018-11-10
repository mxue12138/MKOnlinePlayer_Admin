let index = require(process.cwd() + '/tools/index');

module.exports = (req, res) => {
  res.render('index', { data: index.read() });
}