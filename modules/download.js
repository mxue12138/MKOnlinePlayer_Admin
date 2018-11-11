let https = require('https');
let http = require('http');

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
  let artist = req.query.artist ? ' - ' + req.query.artist : '';;
  app.get(url, (response) => {
    if (response.statusCode != 200) {
      res.json({
        code: 0,
        msg: '歌曲url有误'
      });
      return;
    }
    let Data  = '';
    response.setEncoding('binary'); 
    response.on('data', (data) => {
      Data  += data;
    }).on('end', () => {
      res.writeHead(200, {
        'Content-Type': 'application/x-download',
        'Content-Disposition': 'attachment;filename=' + encodeURIComponent(name) + encodeURIComponent(artist) + url.substring(url.lastIndexOf('.'))
      });
      res.end(Data, 'binary');
    })  
  })
}