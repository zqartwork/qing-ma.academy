/*global jQuery:false */
(function($) {
  
  $('[data-toggle="tooltip"]').tooltip();   

  var wow = new WOW({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false // trigger animations on mobile devices (true is default)
  });
  wow.init();

  //jQuery to collapse the navbar on scroll
  $(window).scroll(function() {
    if ($(".navbar").offset().top > 100) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
    $(".top-area").addClass("top-padding");
    $(".navbar-custom").addClass("reduce");
    $(".project .gallery").addClass("bg-gray");
    $(".project .hotbox ul:first-child").addClass("bg-white");
    $(".project .inlinelist .hotbox").addClass("scroll");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
      $(".top-area").removeClass("top-padding");
      $(".navbar-custom").removeClass("reduce");
    $(".project .gallery").removeClass("bg-gray");
  $(".project .hotbox ul:first-child").removeClass("bg-white");
  $(".project .inlinelist .hotbox").removeClass("scroll");

    }
  });

  var navMain = $(".navbar-collapse"); 
  navMain.on("click", "a:not([data-toggle])", null, function () {
     navMain.collapse('hide');
  });

  //scroll to top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  $('.scrollup').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
  //search
  $( "#search" ).click(function() {
    $( "#myInput" ).focus();
  });

  //jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function() {
    $('.navbar-nav li a').bind('click', function(event) {
      var $anchor = $(this);
      var nav = $($anchor.attr('href'));
      if (nav.length) {
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');

        event.preventDefault();
      }
    });
    $('.page-scroll a').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  });
//carousel
    var $item = $('#mycarousel .item');
	   var $phone = $('#mycarousel .item .phone'); 
     var $pHeight = $('#mycarousel .item .phone').height(); 
    var $wHeight = $(window).height()*0.8;
    $item.height($wHeight); 
    $item.addClass('full-screen');

  function winSize(){
    
    $('#mycarousel img.bg').each(function() {
      var $src = $(this).attr('src');
      var $color = $(this).attr('data-color');
      $(this).parent().css({
        'background-image' : 'url(' + $src + ')',
        'background-color' : $color
      });
      $(this).hide();
    });

  }
  function phoneSize(){
    
    $('#mycarousel .phone img').each(function() {
      var $src = $(this).attr('src');
      var $color = $(this).attr('data-color');
      $(this).parent().parent().css({
        'background-image' : 'url(' + $src + ')',
        'background-color' : $color
      });
      $(this).hide();
    });

  }
    if ($(window).width() <= 767) {
      $('#mycarousel img.bg').hide();
      $phone.addClass('watch');
      $item.height($pHeight);
      phoneSize();
    }
    if ($(window).width() > 767) {
      $('#mycarousel .phone img').hide();
      $phone.removeClass('watch');
      $wHeight = $(window).height()*0.8;
      $item.height($wHeight); 
      winSize();
    }
    



    //下方自動加入控制圓鈕
    var total = $('#mycarousel .carousel-inner div.item').size();
    append_li();
    function append_li()
    {
        var li = "";
        var get_ac = $( "#mycarousel .active" );
        var ac =  $( "#mycarousel .carousel-inner .item" ).index( get_ac );

        for (var i=0; i <= total-1; i++){
            if(i == (ac)/2){
                li += "<li data-target='#mycarousel' data-slide-to='"+i+"' class='active'></li>";
            }else{
                li += "<li data-target='#mycarousel' data-slide-to='"+i+"' class=''></li>";
                }
            }
            $(".carousel-indicators").append(li);
        }

    //單則隱藏控制鈕
    if ($('#mycarousel .carousel-inner div.item').length < 2 ) { 
            $('.carousel-indicators, .carousel-control').hide();
    }

    //縮放視窗調整視窗高度
    $(window).on('resize', function (){
		if ($(this).width() <= 767) { 
			$phone.addClass('watch');
			$item.height($pHeight);
      phoneSize();

    	}if ($(this).width() > 767) {
			$phone.removeClass('watch');
			$wHeight = $(window).height()*0.8;
			$item.height($wHeight); 
      winSize();
			}

    });




    //輪播秒數與滑入停止
    $('#mycarousel').carousel({
      interval: 10000,
      pause: "hover"
    });

//slick
var slideWrapper = $(".main-slider"),
    iframes = slideWrapper.find('.embed-player'),
    lazyImages = slideWrapper.find('.slide-image'),
    lazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command){
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control){
  var currentSlide, slideType, startTime, player, video;

  currentSlide = slick.find(".slick-current");
  slideType = currentSlide.attr("class").split(" ")[1];
  player = currentSlide.find("iframe").get(0);
  startTime = currentSlide.data("video-start");

  if (slideType === "vimeo") {
    switch (control) {
      case "play":
        if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
          currentSlide.addClass('started');
          postMessageToPlayer(player, {
            "method": "setCurrentTime",
            "value" : startTime
          });
        }
        postMessageToPlayer(player, {
          "method": "play",
          "value" : 1
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "method": "pause",
          "value": 1
        });
        break;
    }
  } else if (slideType === "youtube") {
    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "mute"
        });
        postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
    }
  } else if (slideType === "video") {
    video = currentSlide.children("video").get(0);
    if (video != null) {
      if (control === "play"){
        video.play();
      } else {
        video.pause();
      }
    }
  }
}

// Resize player
function resizePlayer(iframes, ratio) {
  if (!iframes[0]) return;
  var win = $(".main-slider"),
      width = win.width(),
      playerWidth,
      height = win.height(),
      playerHeight,
      ratio = ratio || 16/9;

  iframes.each(function(){
    var current = $(this);
    if (width / ratio < height) {
      playerWidth = Math.ceil(height * ratio);
      current.width(playerWidth).height(height).css({
        left: (width - playerWidth) / 2,
         top: 0
        });
    } else {
      playerHeight = Math.ceil(width / ratio);
      current.width(width).height(playerHeight).css({
        left: 0,
        top: (height - playerHeight) / 2
      });
    }
  });
}

// DOM Ready
$(function() {
  // Initialize
  slideWrapper.on("init", function(slick){
    slick = $(slick.currentTarget);
    setTimeout(function(){
      playPauseVideo(slick,"play");
    }, 1000);
    resizePlayer(iframes, 16/9);
  });
  slideWrapper.on("beforeChange", function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick,"pause");
  });
  slideWrapper.on("afterChange", function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick,"play");
  });
  slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
    lazyCounter++;
    if (lazyCounter === lazyImages.length){
      lazyImages.addClass('show');
      // slideWrapper.slick("slickPlay");
    }
  });

  //start the slider
  slideWrapper.slick({
    // fade:true,
    autoplaySpeed:4000,
    lazyLoad:"progressive",
    speed:600,
    arrows:false,
    dots:true,
    cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)"
  });
});

// Resize event
$(window).on("resize.slickVideoPlayer", function(){  
  resizePlayer(iframes, 16/9);
});
	
//slick
//userarticle img-responsive
      $("#userarticle img").css({
        "width": 'auto',
        "maxWidth": '100%',
        'height': 'auto'
        });


})(jQuery);
$(window).load(function() {
  $(".loader").delay(100).fadeOut();
  $("#page-loader").delay(100).fadeOut("fast");
});

  