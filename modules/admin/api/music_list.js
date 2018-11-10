let music_list = require(process.cwd() + '/tools/music_list');
let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  if(token(req) == 1) {
    if (req.body.music_list) {
      music_list.update(req.body.music_list);
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