/*
* module name：outcome.js
* author：niujy
* date：2016年04月04日22:53:53
*/

//全站级脚本的调用入口模块
udvDefine(function(require,exports,module){
  var review = require("review");//回顾
})

// 回顾
udvDefine("review",function (require, exports, module) {
  var nowDate = util.dateFormatFmt( new Date(), "yyyy/MM/dd");
  $('#forecast_date_choose').find('.form-control').val(nowDate);
  $('#forecast_date_choose .input-group.date').datepicker({
    format: "yyyy/mm/dd",
    startDate: "'2016-04-01'",
    endDate: "'2016-06-01'",
    todayBtn: "linked",
    language: "zh-CN",
    orientation: "bottom auto",
    autoclose: true,
    todayHighlight: true
  }).on('changeDate', function(ev){
    // alert(JSON.stringify(ev.date.valueOf()));
  });
});
