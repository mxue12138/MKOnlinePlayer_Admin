let fs = require('fs');
let musicList = require(process.cwd() + '/public/js/musicList.js');

module.exports = new function () {
  this.read = () => {
    return musicList.slice(3);
  }

  this.update = (data) => {
    let text = `/**************************************************
 * MKOnlinePlayer v2.32
 * 播放列表配置模块
 * 编写：mengkun(http://mkblog.cn)
 * 时间：2017-9-15
*************************************************/
// 建议修改前先备份一下
// 获取 歌曲的网易云音乐ID 或 网易云歌单ID 的方法：
// 先在 js/player.js 中开启调试模式，然后按 F12 打开浏览器的控制台。播放歌曲或点开歌单即可看到相应信息

var musicList = ${ JSON.stringify(musicList.slice(0, 3).concat(data), null, 2)};

if (typeof window == 'undefined') {
  module.exports = musicList;
}`;
    fs.writeFile(process.cwd() + '/public/js/musicList.js', text, (err) => {
      if (err) {
        console.log(err);
      }
      return true;
    });
  }
}