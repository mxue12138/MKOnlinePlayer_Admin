let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  token(req).then((data) => {
    if (!data) {
      res.render('admin/login');
      return;
    }
    res.redirect('./index.html');
  });
}
