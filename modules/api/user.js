let model = require(process.cwd() + '/model/model');
let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  token(req).then((data) => {
    if (!data) {
      res.json({
        code: -1,
        msg: 'cookie验证失败'
      });
      return;
    }
    if (req.body.user) {
      model.userModel.updateOne({}, { $set: req.body.index }, (err) => {
        if (err) {
          res.json({
            code: 0,
            msg: '保存失败'
          });
        } else {
          res.json({
            code: 1,
            msg: '保存成功'
          });
        }
      });
    } else {
      res.json({
        code: 0,
        msg: '保存失败'
      });
    }
  });
}
