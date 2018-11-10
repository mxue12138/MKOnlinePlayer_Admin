let index = require(process.cwd() + '/tools/index');

module.exports = (req, res) => {
  let data = index.read();
  data.notice = data.notice.replace(/[\r\n]/g, '');
  res.render('index', { data: data });
}