let user = require(process.cwd() + '/data/user.json');
let md5 = require('md5');

module.exports = (req) => {
  if (req.cookies.MKOnlinePlayer_Admin_Login == md5(user.username + user.password)) {
    return true;
  } else {
    return false;
  }
}