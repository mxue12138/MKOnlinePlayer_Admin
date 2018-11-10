let index = require(process.cwd() + '/tools/index');
let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  if(token(req) == 1) {
    if (req.body.index) {
      index.update(req.body.index);
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