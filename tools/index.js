let fs = require('fs');
let index = require(process.cwd() + '/data/index.json');

module.exports = new function () {
  this.read = () => {
    return index;
  }

  this.update = (data) => {
    fs.writeFile(process.cwd() + '/data/index.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      return true;
    });
  }
}