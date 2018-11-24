let model = require(process.cwd() + '/model/model');
let token = require(process.cwd() + '/tools/token');

module.exports = (req, res) => {
  token(req).then((data) => {
    if (!data) {
      res.redirect('../admin/login.html');
      return;
    }
    model.indexModel.findOne({}).select({ _id: 0 }).exec((err, indexData) => {
      model.playerModel.findOne({}).select({ _id: 0 }).exec((err, playerData) => {
        model.listModel.find({ type: {'$ne': 'preset'}}).select({ type: 0 }).exec((err, listData) => {
          model.userModel.findOne({}).select({ _id: 0 }).where('isAdmin', true).exec((err, userData) => {
            res.render('admin/index', {
              music_list: listData,
              index: indexData,
              player: playerData,
              user: userData
            });
          });
        });
      });
    });
  });
}
