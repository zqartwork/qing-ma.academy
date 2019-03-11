//hover dropdown-nav-menu
$(document).ready(function () {
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
        var nav = $('.nav-before');
        var scroll = $(window).scrollTop();

        if (scroll >= 80) {
            nav.addClass('sticky');
        } else {
            nav.removeClass('sticky');
        }
    })
    $('.mm-navbar__title').prepend('<div class="logo-set-mmenu"><img src="img/logo-school.png"></div>');
    $('.mm-navbar__title').attr('href', 'index.html');
});