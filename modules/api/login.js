let model = require(process.cwd() + '/model/model');
let md5 = require('md5');

module.exports = (req, res) => {
  if (req.body.username && req.body.password) {
    model.userModel.findOne({ username: req.body.username, password: req.body.password }).where('isAdmin', true).exec((err, userData) => {
      if (userData) {
        res.cookie('MKOnlinePlayer_Admin_Login', md5(userData.username + userData.password), { maxAge: 604800000 })
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
    });
  } else {
    res.json({
      code: 0,
      msg: '非法请求'
    });
  }
}
