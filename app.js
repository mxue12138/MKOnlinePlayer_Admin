var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

global.config = eval('(' + require('fs').readFileSync('./config.json') + ')');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));

app.use('/temp', express.static(path.join(__dirname, 'temp'), {
  dotfiles: 'ignore',
  index: false,
  setHeaders: function(res, paths, stat) {
    res.setHeader('Content-Disposition', 'attachment;filename=' + encodeURIComponent(path.basename(paths)));
    res.setHeader('Content-Type', 'application/octet-stream');
  }
}));
app.use('/', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
