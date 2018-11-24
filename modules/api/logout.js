module.exports = (req, res) => {
  res.clearCookie('MKOnlinePlayer_Admin_Login');
  res.json({
    code: 1,
    msg: '退出登陆成功'
  });
}
