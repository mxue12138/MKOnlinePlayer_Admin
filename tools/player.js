let fs = require('fs');
let player = require(process.cwd() + '/data/player.json');

module.exports = new function () {
  this.read = () => {
    return player;
  }

  this.update = (data) => {
    fs.writeFile(process.cwd() + '/data/player.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      return true;
    });
  }
}