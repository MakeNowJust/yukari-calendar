$(function () {
  var
  result = $('#result'),
  config = $('script[src="/javascripts/index.js"]');

  var
  now = new Date(),
  dateInput = $('#date-input');

  dateInput
    .val(config.attr('data-date') || now.getFullYear() + '-' + zp(now.getMonth() + 1) + '-' + zp(now.getDate()))
    .datepicker({
      language: 'ja',
    });

  dateInput.next('.input-group-btn').on('click', function () {
    dateInput.datepicker('show');
  });

  $('#date-button').on('click', function () {
    location.href = (config.attr('data-mode') === 'real' ? '/real/' : '/') + dateInput.val();
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
    result.text(format(data));
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
