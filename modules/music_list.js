let model = require(process.cwd() + '/model/model');

module.exports = (req, res) => {
  res.set('Content-Type', 'application/javascript; charset=UTF-8');
  model.listModel.find({}).select({ _id: 0 }).select({ type: 0 }).exec((err, listData) => {
    res.render('music_list', { data: listData });
  })
}
