let player = require(process.cwd() + '/tools/player');

module.exports = (req, res) => {
  let data = player;
  res.set('Content-Type', 'application/javascript; charset=UTF-8');
  res.render('player', { data: data });
}