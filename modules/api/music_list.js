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
    if (req.body.music_list) {
      let data = req.body.music_list;
      let isOk = true;
      for(let i = 0; i < data.length; i++) {
        if (data[i]._id && !data[i].del) {
          model.listModel.updateOne({ _id: data[i]._id }, { $set: data[i] }, (err) => {
            if (err) {
              isOk = false;
              return;
            }
          });
        } else if (data[i].del) {
          model.listModel.remove({ _id: data[i]._id }, (err) => {
            if (err) {
              isOk = false;
              return;
            }
          })
        } else {
          let listEntity = new model.listModel({
            id: data[i].id,
            type: 'menu'
          });
          listEntity.save((err) => {
            if (err) {
              isOk = false;
              return;
            }
          })
        }
      }
      if (isOk) {
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
    }
  });
}
