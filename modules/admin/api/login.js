let user = require(process.cwd() + '/data/user.json');
let md5 = require('md5');

module.exports = (req, res) => {
  if (req.body.username && req.body.password) {
    if (req.body.username == user.username && req.body.password == user.password) {
      res.cookie('MKOnlinePlayer_Admin_Login', md5(user.username + user.password), { maxAge: 604800000 })
      res.json({
        code: 1,
        msg: '登陆成功'
      });
    } else {
      res.json({
        code: 0,
        msg: '账号或密码错误'
      });
    }
  } else {
    res.json({
      code: 0,
      msg: '非法请求'
    });
  }
}