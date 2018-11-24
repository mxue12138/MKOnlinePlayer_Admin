let model = require(process.cwd() + '/model/model');
let md5 = require('md5');

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    model.userModel.findOne({}).where('isAdmin', true).exec((err, userData) => {
      if (req.cookies.MKOnlinePlayer_Admin_Login == md5(userData.username + userData.password)) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  })
}