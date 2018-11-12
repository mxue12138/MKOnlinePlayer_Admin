let https = require('https');
let http = require('http');
let fs = require('fs');

module.exports = (req, res) => {
  if (!req.query.url) {
    res.json({
      code: 0,
      msg: '歌曲url有误'
    });
    return;
  } else if (!req.query.name) {
    res.json({
      code: 0,
      msg: '歌曲名称有误'
    });
    return;
  } else if (!req.query.source) {
    res.json({
      code: 0,
      msg: '歌曲类型有误'
    });
    return;
  }
  let url = req.query.url;
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
  let name = req.query.name;
  let artist = req.query.artist ? '-' + req.query.artist : '';
  let filename = name + artist + url.substring(url.lastIndexOf('.')).split('?')[0].split('#')[0];
  let filepath = process.cwd() + '/public/temp/' + req.query.source + '/' + req.query.id + '.' + filename;
  fs.exists(filepath, (data) => {
    if (data) {
      res.download(filepath, filename);
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
            res.download(filepath, filename);
          });
        })  
      })
    }
  })
}