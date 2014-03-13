var
moment = require('moment');

var
yukariBirth   = moment('19760227', 'YYYYMMDD'),
yukariBirth17 = moment(yukariBirth).add('years', 17);

module.exports.years_old = function years_old(req, res) {
  var
  dateStr = req.query.date || moment(),
  time = moment(dateStr),
  years, month, days;

  if (time.isAfter(yukariBirth17)) {
    years = 17;
    month = time.diff(yukariBirth17, 'month');
    days  = time.diff(moment(yukariBirth17).add('month', month), 'days');
  } else {
    years = time.diff(yukariBirth, 'years');
    month = time.diff(moment(yukariBirth).add('years', years), 'month');
    days  = time.diff(moment(yukariBirth).add('month', month + years * 12), 'days');
  }

  res.json({
    years: years,
    month: month,
    days:  days,
  });
};
