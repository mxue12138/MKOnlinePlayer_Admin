let https = require('https');
let http = require('http');
let fs = require('fs');

module.exports = (req, res) => {
  if (!req.body.url) {
    res.json({
      code: 0,
      msg: '歌曲url有误'
    });
    return;
  } else if (!req.body.name) {
    res.json({
      code: 0,
      msg: '歌曲名称有误'
    });
    return;
  } else if (!req.body.source) {
    res.json({
      code: 0,
      msg: '歌曲类型有误'
    });
    return;
  }
  let url = req.body.url;
  let app;
  if (url.substring(0, url.indexOf('://')) == 'https') {
    app = https;
  } else if (url.substring(0, url.indexOf('://')) == 'http') {
    app = http;
  } else {
    res.json({
      code: 0,
      msg: '协议有误，非法请求'
    });
    return;
  }
  let name = req.body.name;
  let artist = req.body.artist ? ' - ' + req.body.artist : '';
  let filename = name + artist + url.substring(url.lastIndexOf('.')).split('?')[0].split('#')[0];
  let filepath = process.cwd() + '/public/temp/' + req.body.source + '/' + filename;
  fs.exists(filepath, (data) => {
    if (data) {
      res.json({
        code: 1,
        msg: '音频url获取成功',
        data: {
          url: './temp/' + req.body.source + '/' + filename
        }
      });
    } else {
      app.get(url, (response) => {
        let Data  = '';
        response.setEncoding('binary'); 
        response.on('data', (data) => {
          Data += data;
        }).on('end', () => {
          fs.writeFile(filepath, Data, 'binary', (err) => {
            if (err) {
              console.log(err);
            }
            res.json({
              code: 1,
              msg: '音频url获取成功',
              data: {
                url: './temp/' + req.body.source + '/' + filename
              }
            });
          });
        })  
      })
    }
  })
}