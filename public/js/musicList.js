/**************************************************
 * MKOnlinePlayer v2.32
 * 播放列表配置模块
 * 编写：mengkun(http://mkblog.cn)
 * 时间：2017-9-15
*************************************************/
// 建议修改前先备份一下
// 获取 歌曲的网易云音乐ID 或 网易云歌单ID 的方法：
// 先在 js/player.js 中开启调试模式，然后按 F12 打开浏览器的控制台。播放歌曲或点开歌单即可看到相应信息

var musicList = [
  {
    "name": "搜索结果",
    "cover": "",
    "creatorName": "",
    "creatorAvatar": "",
    "item": []
  },
  {
    "name": "正在播放",
    "cover": "",
    "creatorName": "",
    "creatorAvatar": "",
    "item": []
  },
  {
    "name": "播放历史",
    "cover": "images/history.png",
    "creatorName": "",
    "creatorAvatar": "",
    "item": []
  },
  {
    "id": "3778678"
  },
  {
    "id": "3779629"
  },
  {
    "id": "4395559"
  },
  {
    "id": "64016"
  },
  {
    "id": "112504"
  },
  {
    "id": "19723756"
  },
  {
    "id": "2884035"
  },
  {
    "id": "440103454"
  }
];

if (typeof window == 'undefined') {
  module.exports = musicList;
}