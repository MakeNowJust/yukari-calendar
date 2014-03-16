var
moment = require('moment');

var
yukariBirth   = moment('19760227', 'YYYYMMDD'),
yukariBirth17 = moment(yukariBirth).add('years', 17);

module.exports.years_old = function years_old(req, res) {
  var
  dateStr = req.query.date || moment(),
  mode = req.query.mode || 'kingdom',
  time = moment(dateStr),
  years, month, days;

  if (!(mode === 'kingdom' || mode === 'real')) {
    res.jsonp(400, {
      error: 'invalid mode',
    });
    return;
  }

  if (time.isValid()) {
    res.jsonp(400, {
      error: 'invalid date format',
    });
    return;
  }

  if (time.isBefore(yukariBirth)) {
    res.jsonp(400, {
      error: 'yukari has not been born yet',
    });
    return;
  }

  if (time.isAfter(yukariBirth17) && mode !== 'real') {
    years = 17;
    month = time.diff(yukariBirth17, 'month');
    days  = time.diff(moment(yukariBirth17).add('month', month), 'days');
  } else {
    years = time.diff(yukariBirth, 'years');
    month = time.diff(moment(yukariBirth).add('years', years), 'month');
    days  = time.diff(moment(yukariBirth).add('month', month + years * 12), 'days');
  }

  res.jsonp({
    years: years,
    month: month,
    days:  days,
  });
};
