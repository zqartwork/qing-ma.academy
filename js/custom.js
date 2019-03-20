//hover dropdown-nav-menu
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: false // trigger animations on mobile devices (true is default)
    });
    wow.init();

    $('ul#nav ul.sub-menu').css('opacity', 0.0);
    $('ul#nav li').hover(function () {
        $(this).find('.sub-menu').stop().animate({
            opacity: 1.0
        }, 300);
    },
        function () {
            $(this).find('.sub-menu').stop().animate({
                opacity: 0.0
            }, 300);
        });
    $(window).scroll(function () {
        var nav = $('.navbar');
        var scroll = $(window).scrollTop();

        if (scroll >= 96) {
            nav.addClass('sticky');
        } else {
            nav.removeClass('sticky');
        }
    });

    $(window).scroll(function () {
        var stickyBottomOffset = $('footer').height();
        $(".video-section-wrapper").sticky({ topSpacing: 0, bottomSpacing: stickyBottomOffset + $('.video-section-wrapper').height() / 5 });
    });


    $('.mm-navbar__title').prepend('<div class="logo-set-mmenu"><img src="img/logo-school.png"></div>');
    $('.mm-navbar__title').attr('href', 'index.html');

    $('#logOut').click(function () {
        $('.user__option-wrapper').toggleClass('show');
    });
    $(document).click(function (event) {
        //if you click on anything except the modal itself or the "open modal" link, close the modal
        if (!$(event.target).closest("#logOut,.user__option-wrapper").length) {
            $("body").find(".user__option-wrapper").removeClass("show");
        }
    });
});


// 首頁輪播Banner區塊
var slideWrapper = $(".main-slider"),
    iframes = slideWrapper.find('.embed-player'),
    lazyImages = slideWrapper.find('.slide-image'),
    lazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command) {
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control) {
    var currentSlide, slideType, startTime, player, video;

    currentSlide = slick.find(".slick-current");
    slideType = currentSlide.attr("class").split(" ")[1];
    player = currentSlide.find("iframe").get(0);
    startTime = currentSlide.data("video-start");

    if (slideType === "vimeo") {
        switch (control) {
            case "play":
                if ((startTime != null && startTime > 0) && !currentSlide.hasClass('started')) {
                    currentSlide.addClass('started');
                    postMessageToPlayer(player, {
                        "method": "setCurrentTime",
                        "value": startTime
                    });
                }
                postMessageToPlayer(player, {
                    "method": "play",
                    "value": 1
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
            if (control === "play") {
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
        ratio = ratio || 16 / 9;

    iframes.each(function () {
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
$(function () {
    // Initialize
    slideWrapper.on("init", function (slick) {
        slick = $(slick.currentTarget);
        setTimeout(function () {
            playPauseVideo(slick, "play");
        }, 1000);
        resizePlayer(iframes, 16 / 9);
    });
    slideWrapper.on("beforeChange", function (event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick, "pause");
    });
    slideWrapper.on("afterChange", function (event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick, "play");
    });
    slideWrapper.on("lazyLoaded", function (event, slick, image, imageSource) {
        lazyCounter++;
        if (lazyCounter === lazyImages.length) {
            lazyImages.addClass('show');
            // slideWrapper.slick("slickPlay");
        }
    });

    //start the slider
    slideWrapper.slick({
        // fade: true,
        autoplaySpeed: 4000,
        lazyLoad: "progressive",
        speed: 600,
        cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)"
    });

});

// Resize event
$(window).on("resize.slickVideoPlayer", function () {
    resizePlayer(iframes, 16 / 9);
});

// 前端愛心收藏按鈕動畫
$(document).ready(function () {
    $('.add').click(function () {
        $('.thumb-header').toggleClass('liked');
        $('.thumb-header .add').html('<i class="far fa-heart"></i>');
        $('.thumb-header.liked .add').html('<i class="fas fa-heart"></i>');
    });
});

$('.master-main-slider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 5,
    autoplay: true,
    responsive: [{
        breakpoint: 1150,
        settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
        }
    }, {
        breakpoint: 768,
        settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
        }
    },
    {
        breakpoint: 576,
        settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
        }
    }
    ]

});

var $el, $ps, $up, totalHeight;

$(".read-more .button").click(function () {

    totalHeight = 0;

    $el = $(this);
    $p = $el.parent();
    $up = $p.parent();
    $ps = $up.find('.box-inner');

    // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
    $ps.each(function () {
        totalHeight += $(this).outerHeight();
    });

    $up
        .css({
            // Set height to prevent instant jumpdown when max height is removed
            "height": $up.height(),
            "max-height": 9999
        })
        .animate({
            "height": totalHeight
        });

    // fade out read-more
    $p.fadeOut();

    // prevent jump-down
    return false;

});
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
};

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

$('#replybtn').click(function () {
    $('#replySection')
        .css('display', 'flex')
        .animate({
            opacity: 1
        });
    $('#replybtn').hide();
})

$('#exitbtn').click(function () {
    $('#replySection')
        .css('display', 'none')
        .animate({
            opacity: 0
        });
    $('#replybtn').hide(); $('#replybtn').css('display', 'inline-block')
        .animate({
            opacity: 1
        });
})