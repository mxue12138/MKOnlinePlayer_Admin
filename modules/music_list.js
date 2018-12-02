let model = require(process.cwd() + '/model/model');

module.exports = (req, res) => {
  res.set('Content-Type', 'application/javascript');
  model.listModel.find({}).sort({ _id: 1 }).select({ _id: 0 }).select({ type: 0 }).exec((err, listData) => {
    res.render('music_list', { data: listData });
  })
}
