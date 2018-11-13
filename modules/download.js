let fs = require('fs');
let request = require('request');

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
  let protocol;
  if (url.substring(0, url.indexOf('://')) == 'https') {
    protocol = 'https://';
  } else if (url.substring(0, url.indexOf('://')) == 'http') {
    protocol = 'http://';
  } else {
    res.json({
      code: 0,
      msg: 'url协议有误'
    });
    return;
  }
  let name = req.body.name;
  let artist = req.body.artist ? ' - ' + req.body.artist : '';
  let filename = name + artist + url.substring(url.lastIndexOf('.')).split('?')[0].split('#')[0];
  let filepath = process.cwd() + '/temp/' + req.body.source + '/' + filename;
  let oldhost = url.substring(url.indexOf('://') + 3);
  let host = oldhost.substring(0, oldhost.indexOf('/'));
  request.get({
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
      'Referer': protocol + host,
      'Origin': protocol + host,
      'Host': host
    }
  }).on('end', (end) => {
    res.json({
      code: 1,
      msg: '音频url获取成功',
      data: {
        url: './temp/' + req.body.source + '/' + filename
      }
    });
  }).pipe(fs.createWriteStream(filepath));
}