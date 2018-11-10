let fs = require('fs');
let user = require(process.cwd() + '/data/user.json');

module.exports = new function () {
  this.read = () => {
    return user;
  }
}