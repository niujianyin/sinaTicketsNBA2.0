/*
* module name：outcome.js
* author：niujy
* date：2016年04月04日22:53:53
*/

//全站级脚本的调用入口模块
udvDefine(function(require,exports,module){
  // var navSubs = require("navSubs");//导航切换效果
  // var matchSlider = require("matchSlider");//比赛滚动图
  // var slider = require("slider");//首屏滚动图
  // var sinaPlayer = require("sinaPlayer");//首屏滚动图 - 视频播放
  // var launch = require("launch");//模块展开收起功能
})

//导航切换效果
udvDefine("navSubs",function(require,exports,module){
  (function($){
    var $nav = $("#nav_list"),
      $navItem = $nav.find("li"),curSub = "basic";
    $nav.on("mouseenter","li",function(){
      var sub = $(this).data("sub");
      if( curSub != $.trim(sub)){
        $("#sub_nav_"+sub).show().siblings(".nav_sub").hide();
        curSub = sub;
      }
    });
  })(jQuery)
})

//比赛滚动图
udvDefine("matchSlider",function(require,exports,module){
  (function($){
    var ScrollPic = require("sina.ScrollPic");
    var scrollObj = new ScrollPic();
    scrollObj.scrollContId = "mrms";
    scrollObj.arrLeftId = "mrmsl";
    scrollObj.arrRightId = "mrmsr";
    scrollObj.dotListId = "";
    scrollObj.pageWidth = 462;
    scrollObj.frameWidth = 770;
    scrollObj.speed = 30;
    scrollObj.space = 60;
    scrollObj.autoPlay = false;
    scrollObj.initialize();

    document.getElementById('mrmsl').onclick = function(){
      scrollObj.pre();
      return false;
    }
    document.getElementById('mrmsr').onclick = function(){
      scrollObj.next();
      return false;
    }
    module.exports = scrollObj;
  })(jQuery);
})


//首屏滚动图
udvDefine("slider",function(require,exports,module){
  (function($){
    var ScrollPic = require("sina.ScrollPic");

    var scrollObj = new ScrollPic();
    scrollObj.scrollContId = "fsSliderWrap";
    scrollObj.arrLeftId = "fsSliderLeftArr";
    scrollObj.arrRightId = "fsSliderRightArr";
    scrollObj.dotListId = "fsSliderDotBox";
    scrollObj.pageWidth = 470;
    scrollObj.frameWidth = 470;
    scrollObj.speed = 30;
    scrollObj.space = 60;
    scrollObj.autoPlay = true;
    scrollObj.initialize();

    $('#fsSliderWrap').on("mouseenter",function(){
      $(this).find(".slider_cont_info").addClass("hover");
    });
    $('#fsSliderWrap').on("mouseleave",function(){
      $(this).find(".slider_cont_info").removeClass("hover");
    });
    document.getElementById('fsSliderLeftArr').onclick = function(){
      scrollObj.pre();
      return false;
    }
    document.getElementById('fsSliderRightArr').onclick = function(){
      scrollObj.next();
      return false;
    }
    module.exports = scrollObj;
  })(jQuery);
})

//首屏滚动图 - 视频播放
udvDefine("sinaPlayer",["slider"],function(require,exports,module){

  (function($){
    var slider = require("slider");
    var player = sinaVideoPlayer(window.sinaBokePlayerConfig_o);
    var aPlayInfo = [];

    var isIOS = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
    if(isIOS){
      $(".slider_playBtn").hide();
      return;
    }
    $(".slider_playBtn").on("click",function(){
      aPlayInfo = $(this).data("playInfo").split("-");
      $(".fs_sinaPlayer_wrap").show();
      window.SinaBokePlayer_o.addVars('HTML5Player_controlBar', true);
          window.SinaBokePlayer_o.addVars('HTML5Player_autoChangeBGColor', false);
      window.SinaBokePlayer_o.showFlashPlayer();
      slider.autoPlay = false;
    })
    $("#sinaPlayerCloseBtn").on("click",function(){
      $(".fs_sinaPlayer_wrap").hide();
      $("#sinaPlayer").html("");
      slider.autoPlay = true;
    })
    window.playCompleted = function(){
      document.getElementById('myMovie').playVideo(aPlayInfo[0],aPlayInfo[1],aPlayInfo[2]);
    };
    window.flashInitCompleted = function(){
      window.playCompleted();
    };
  })(jQuery);
})

//模块展开收起功能
udvDefine("launch",function(require,exports,module){
  (function($){
    $("#secondScreen").on("click",".cln_down",function(){
      var _t = $(this),
        $cln = _t.closest(".column"),
        $clnList = $cln.find(".cln_other"),
        $clnMain = $cln.find(".cln_main"),
        $otherCln = $cln.siblings(".column"),
        $otherClnDown = $otherCln.find(".cln_down"),
        $otherClnList = $otherCln.find(".cln_other"),
        $otherClnMain = $otherCln.find(".cln_main");

      if( _t.hasClass("cln_down_main") ){
        var $ad = $("#ss_ad");
        if( _t.hasClass("cln_up") ){
          _t.removeClass("cln_up");
          $ad.stop(true,true).slideDown(200);
        } else {
          _t.addClass("cln_up");
          $ad.stop(true,true).slideUp(200);
        }
      } else if( _t.hasClass("cln_down_other") ){
        if( _t.hasClass("cln_up") ){
          _t.removeClass("cln_up");
          $cln.removeClass("mt10").addClass("mt20");
          $otherClnDown.removeClass("cln_up");
          $otherClnList.hide();
          $otherClnMain.stop(true,true).slideDown(200);
        } else {
          _t.addClass("cln_up");
          $cln.removeClass("mt20").addClass("mt10");
          $otherClnDown.removeClass("cln_up");
          $otherClnMain.stop(true,true).slideUp(200);
        }
      } else {
        $otherCln.removeClass("mt10").addClass("mt20");
        if( _t.hasClass("cln_up") ){
          _t.removeClass("cln_up");
          $otherClnDown.removeClass("cln_up");
          $clnList.stop(true,true).slideUp(200);
        } else {
          _t.addClass("cln_up");
          $otherClnDown.removeClass("cln_up");
          if( $clnMain.is(":hidden") ){
            $clnList.show();
            $clnMain.slideDown(200);
          } else {
            $clnList.stop(true,true).slideDown(200);
          }
        }
      }
    });
  })(jQuery);
})