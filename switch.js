let fs = require('fs');

if (!fs.existsSync(process.cwd() + '/musicList.js')) {
  console.log('musicList.js不存在，请确认文件是否已经复制到当前目录下。');
} else {
  fs.readFile(process.cwd() + '/musicList.js', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      console.log('修改失败，请确认musicList.js是否有读取权限');
      return;
    }
    let reg = /musicList\s*?=\s*?([\s\S]*?);/;
    if (!reg.test(data)) {
      console.log('修改失败，请确认musicList.js文件编码或内容是否有误');
      return;
    }
    let html = reg.exec(data)[1];
    let datas = eval('(' + html + ')');
    let arr = [];
    for (let i = 0; i < datas.length; i++) {
      if (i < 3) {
        arr.push(datas[i]);
      } else if (!datas[i].name && i >= 3) {
        arr.push(datas[i]);
      }
    }
      let text = `/**************************************************
 * MKOnlinePlayer v2.32
 * 播放列表配置模块
 * 编写：mengkun(http://mkblog.cn)
 * 时间：2017-9-15
*************************************************/
// 建议修改前先备份一下
// 获取 歌曲的网易云音乐ID 或 网易云歌单ID 的方法：
// 先在 js/player.js 中开启调试模式，然后按 F12 打开浏览器的控制台。播放歌曲或点开歌单即可看到相应信息

var musicList = ${ JSON.stringify(arr, null, 2)};

if (typeof window == 'undefined') {
  module.exports = musicList;
}`;
      fs.writeFile(process.cwd() + '/public/js/musicList.js', text, (err) => {
        if (err) {
          console.log(err);
          console.log('修改失败，请确认musicList.js是否有写入权限');
          return;
        }
        console.log('musicList.json修改完毕，请删除本脚本（switch.js）以及当前目录下的musicList.js');
      });
  });
}

if (!fs.existsSync(process.cwd() + '/player.js')) {
  console.log('player.js不存在，请确认文件是否已经复制到当前目录下。');
} else {
  fs.readFile(process.cwd() + '/player.js', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      console.log('修改失败，请确认是player.js否有读取权限');
      return;
    }
    let reg = /mkPlayer\s*?=\s*?([\s\S]*?);/;
    if (!reg.test(data)) {
      console.log('修改失败，请确认player.js文件编码或内容是否有误');
      return;
    }
    let html = reg.exec(data)[1];
    let datas = eval('(' + html + ')');
    let text = JSON.stringify(datas, null, 2);
    fs.writeFile(process.cwd() + '/data/player.json', text, (err) => {
      if (err) {
        console.log(err);
        console.log('修改失败，请确认player.json是否有写入权限');
        return;
      }
      console.log('player.json修改完毕，请删除本脚本（switch.js）以及当前目录下的player.js');
    });
  });
}

if (!fs.existsSync(process.cwd() + '/index.html')) {
  console.log('index.html不存在，请确认文件是否已经复制到当前目录下。');
} else {
  fs.readFile(process.cwd() + '/index.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      console.log('修改失败，请确认是index.html否有读取权限');
      return;
    }
    let cheerio = require('cheerio');
    let $ = cheerio.load(data);
    let datas = {
      'title': $('title').text().trim(),
      'description': $('meta[name="description"]').attr('content').trim(),
      'keywords': $('meta[name="keywords"]').attr('content').trim(),
      'logo_text': $('.header .logo').text().trim(),
      'footer': $('body > span').text().trim(),
      "notice_show": false,
      "notice": "<p style=\"text-align: center;\">公告</p>"
    }
    fs.writeFile(process.cwd() + '/data/index.json', JSON.stringify(datas, null, 2), (err) => {
      if (err) {
        console.log(err);
        console.log('修改失败，请确认index.html是否有写入权限');
        return;
      }
      console.log('index.html修改完毕，请删除本脚本（switch.js）以及当前目录下的index.html');
    });
  });
}