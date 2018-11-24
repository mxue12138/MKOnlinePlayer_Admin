let model = require(process.cwd() + '/model/model');

module.exports = (req, res) => {
  model.indexModel.findOne({}).select({ _id: 0 }).exec((err, indexData) => {
    res.render('index', { data: indexData });
  })
}
