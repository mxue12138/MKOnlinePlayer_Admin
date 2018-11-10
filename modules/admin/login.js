let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  if(token(req) == 1) {
    res.redirect('/admin/index.html');
  } else {
    res.render('admin/login');
  }
}