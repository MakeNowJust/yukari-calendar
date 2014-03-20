$(function () {
  var
  result = $('#result'),
  config = $('script[src="/javascripts/index.js"]');

  var
  now = new Date(),
  dateInput = $('#date-input');

  dateInput
    .datepicker({
      language: 'ja',
    });

  dateInput.datepicker('update', config.attr('data-date') || new Date());

  $('#date-button').on('click', function () {
    var
    date = dateInput.datepicker('getDate');
    location.href = (config.attr('data-mode') === 'real' ? '/real/' : '/') + date.getFullYear() + '-' + zp(date.getMonth() + 1) + '-' + zp(date.getDate());
  });

  $('#day').text(config.attr('data-date') || '今日');

  $.ajax({
    url:  '/api/years_old.json',
    type: 'GET',
    dataType: 'json',
    data: {
      date: config.attr('data-date'),
      mode: config.attr('data-mode'),
    },
    cache: false,
  }).done(function (data) {
    var
    fmt = format(data),
    btn = $('<a>');
    result.text(fmt);

    btn
      .attr({
        'href': 'https://twitter.com/share',
        'data-via': 'make_now_just',
        'data-text': result.parent().text(),
        'data-lang': 'ja',
      })
      .addClass('twitter-share-button')
      .appendTo('#tweet-btn');
    setTimeout(function f() {
      if (twttr) twttr.widgets.load();
      else setTimeout(f, 100);
    }, 100);
  }).fail(function (err) {
    try {
      var
      res = JSON.parse(err.responseText);
      result.parent().text('Error: ' + res.error);
    } catch (e) {
      result.parent().text('Error');
    }
  });

  function zp(n) {
    return ('0' + n).slice(-2);
  }

  function format(data) {
    var
    flag = false,
    res = data.years + '歳';
    
    if (data.month !== 0) {
      res += 'と' + data.month + 'ヶ月';
      flag = true;
    }
    if (data.days !== 0) {
      res += (flag ? '' : 'と') + data.days + '日';
    }

    return res;
  }
});
