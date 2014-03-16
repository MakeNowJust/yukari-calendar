var
express = require('express'),
http = require('http'),
path = require('path'),
favicon = require('static-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser');

var
routes = require('./routes');

var
app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// no-cache
app.use(function (req, res, next) {
  var
  date = new Date().toGMTString();
  res.set({
    'Cache-Control': 'no-cache',
    'Date': date,
    'Expires': date,
  });
  next();
});

app.use(app.router);

app.get('/', routes.index);
app.get('/real', routes.real);
app.get('/:date', routes.date);
app.get('/real/:date', routes.realDate);
app.get('/api/years_old.json', routes.api.years_old);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
