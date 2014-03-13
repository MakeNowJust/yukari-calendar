$(function () {
  var
  result = $('#result');

  $.ajax({
    url:  '/api/years_old',
    type: 'GET',
    dataType: 'json',
    cache: false,
  }).done(function (data) {
    result.text(format(data));
  }).fail(function (err) {
    //do nothing
  });

  function format(data) {
    var
    flag = false,
    res = data.years + '歳';
    
    if (res.month !== 0) {
      res += 'と' + data.month + 'ヶ月';
      flag = true;
    }
    if (res.days !== 0) {
      res += (flag ? '' : 'と') + data.days + '日';
    }

    return res;
  }
});
