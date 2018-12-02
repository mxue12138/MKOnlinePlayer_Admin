let model = require(process.cwd() + '/model/model');

module.exports = (req, res) => {
  res.set('Content-Type', 'application/javascript');
  model.playerModel.findOne({}).select({ _id: 0 }).exec((err, playerData) => {
    res.render('player', { data: playerData });
  })
}
