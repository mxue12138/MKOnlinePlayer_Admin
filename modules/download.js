let fs = require('fs');
let path = require('path');
let request = require('request');

module.exports = (req, res) => {
  let data;
  if (req.method.toLowerCase() == 'get') {
    data = req.query;
  } else {
    data = req.body;
  }
  if (!data.url) {
    res.json({
      code: 0,
      msg: '歌曲url有误'
    });
    return;
  } else if (!data.name) {
    res.json({
      code: 0,
      msg: '歌曲名称有误'
    });
    return;
  } else if (!data.source) {
    res.json({
      code: 0,
      msg: '歌曲类型有误'
    });
    return;
  }
  let url = data.url;
  let protocol;
  if (url.substring(0, url.indexOf('://')) == 'https') {
    protocol = 'https://';
  } else if (url.substring(0, url.indexOf('://')) == 'http') {
    protocol = 'http://';
  } else {
    res.json({
      code: 0,
      msg: '歌曲url协议有误'
    });
    return;
  }
  let name = data.name;
  let artist = data.artist ? ' - ' + data.artist : '';
  let filename = (name + artist + path.extname(data.url).split('?')[0].split('#')[0]).replace('/', '&');
  let filepath = process.cwd() + '/temp/' + data.source + '/' + filename;
  let downpath = './temp/' + data.source + '/' + filename;
  if (fs.existsSync(filepath)) {
    res.json({
      code: 1,
      msg: '歌曲url获取成功',
      data: {
        url: downpath
      }
    })
    return;
  }
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
  }).on('response', function(response) {
    if (response.statusCode == 404 || response.statusCode == 403 || response.statusCode == 502 || response.statusCode == 503) {
      res.json({
        code: 0,
        msg: '歌曲url获取失败'
      })
      return;
    }
  }).pipe(fs.createWriteStream(filepath).on('close', () => {
    res.json({
      code: 1,
      msg: '歌曲url获取成功',
      data: {
        url: downpath
      }
    })
  }))
}
