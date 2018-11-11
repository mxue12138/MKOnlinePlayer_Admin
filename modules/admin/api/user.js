let user = require(process.cwd() + '/tools/user');
let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  if(token(req)) {
    if (req.body.user) {
      if (req.body.user.username == user.read().username && req.body.user.password == user.read().password) {
        res.json({
          code: 0,
          msg: '账号或密码未修改'
        });
      }
      user.update(req.body.user);
      res.json({
        code: 1,
        msg: '保存成功'
      });
    } else {
      res.json({
        code: 0,
        msg: '保存失败'
      });
    }
  } else {
    res.json({
      code: -1,
      msg: 'cookie验证失败'
    });
  }
}