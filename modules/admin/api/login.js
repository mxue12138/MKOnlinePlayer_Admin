let user = require(process.cwd() + '/tools/user');
let md5 = require('md5');

module.exports = (req, res) => {
  if (req.body.username && req.body.password) {
    if (req.body.username == user.read().username && req.body.password == user.read().password) {
      res.cookie('MKOnlinePlayer_Admin_Login', md5(user.read().username + user.read().password), { maxAge: 604800000 })
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