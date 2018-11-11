let fs = require('fs');
let user = require(process.cwd() + '/data/user.json');

module.exports = new function () {
  this.read = () => {
    return user;
  }

  this.update = (data) => {
    fs.writeFile(process.cwd() + '/data/user.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
      return true;
    });
  }
}