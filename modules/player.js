let model = require(process.cwd() + '/model/model');

module.exports = (req, res) => {
  model.playerModel.findOne({}).select({ _id: 0 }).exec((err, playerData) => {
    res.json({
      data: playerData
    });
  })
}
