var
title = 'ゆかりカレンダー';

//get /
exports.index = function (req, res) {
  res.render('index', { title: title });
};

//get /real
exports.real = function (req, res) {
  res.render('index', { title: title, mode: 'real' });
};

//get /:date
exports.date = function (req, res) {
  res.render('index', { title: title, date: req.params.date });
};

//get /real/:date
exports.realDate = function (req, res) {
  res.render('index', { title: title, date: req.params.date, mode: 'real' });
};

//access /api/*
exports.api = require('./api');
