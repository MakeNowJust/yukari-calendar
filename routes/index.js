var
_     = require('lodash');

var
title = 'ゆかりカレンダー',
ga    = require('./ga.js'),
base  = {
  title: title,
  ga: ga,
};

//get /
exports.index = function (req, res) {
  res.render('index', base);
};

//get /real
exports.real = function (req, res) {
  res.render('index', _.assign({}, base, {mode: 'real'}));
};

//get /:date
exports.date = function (req, res) {
  res.render('index', _.assign({}, base, { date: req.params.date }));
};

//get /real/:date
exports.realDate = function (req, res) {
  res.render('index', _.assign({}, base, { date: req.params.date, mode: 'real' }));
};

//access /api/*
exports.api = require('./api');
