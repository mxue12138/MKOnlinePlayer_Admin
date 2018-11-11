let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  if(token(req)) {
    res.redirect('/admin/index.html');
  } else {
    res.render('admin/login');
  }
}