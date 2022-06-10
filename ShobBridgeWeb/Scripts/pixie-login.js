$(document).on('click', '.forgot-pass', function (event) {
    $('body').addClass('open-forgot-pass-box');
});

$(document).on('click', '.login-btn', function (event) {
    $('body').removeClass('open-forgot-pass-box');
});

var owl = $("#BannerSlider");
owl.owlCarousel({ singleItem: true, autoPlay: true });