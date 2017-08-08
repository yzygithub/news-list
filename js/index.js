$(function () {

  //导航
  var vNavWaitSlide, NavWaitSlide;
  $('#nav > li').hover(
    function () {
      $(this).find('a:first').addClass("hover");
      var current_li = $(this), targ = $(current_li).find('ul:first');
      NavWaitSlide = setTimeout(function () {
        if (!$(targ).is(':visible')) {
          $(targ).slideDown(200);
        }
      }, 100)
    },
    function () {
      clearTimeout(NavWaitSlide);
      $(this).find('ul').hide();
      $(this).find('a:first').removeClass("hover");
    }
  );

  //切换tab
  $('.swap-menu a').click(function () {
    var dex = $(this).index();
    $(this).addClass('current').siblings().removeClass('current');
    $('#' + $(this).parent().attr("targ")).children().eq(dex).addClass('on').siblings().removeClass('on');
  })

  $(".weixin").hover(function () {
      $(".qcode").show("fast");
    },
    function () {
      $(".qcode").hide("fast");
    }
  )

})
