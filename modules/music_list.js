let model = require(process.cwd() + '/model/model');

module.exports = (req, res) => {
  model.listModel.find({}).sort({ _id: 1 }).select({ _id: 0 }).select({ type: 0 }).exec((err, listData) => {
    res.json({
      data: listData
    });
  })
}
