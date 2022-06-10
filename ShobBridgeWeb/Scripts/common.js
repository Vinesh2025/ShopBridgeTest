//for page-inner-container start
var calcHeight = function () {
    var headerHeight = $('header').height();
    var mainHeaderHeight = $('.main-header-container').height();
    var footerHeight = $('footer').height();
    var totalHeaderHeight = mainHeaderHeight + headerHeight + footerHeight + 112;

    $('.main-left-right-container').height($(window).height() - totalHeaderHeight);
}

var calcWidthWithoutMenu = function () {
    var leftSide = $('.left-side-container').width();
    var totalWidth = leftSide;
    $('.right-side-col-one, .right-one-fixed-container').width($(window).width() - totalWidth);
}

var calcWidth = function () {
    var menuAccordian = $('#menu-accordian').width();
    var leftSide = $('.left-side-container').width();
    var totalWidth = menuAccordian + leftSide;
    $('.right-side-col-one, .right-one-fixed-container').width($(window).width() - totalWidth);

}

var calcWidthToggle = function () {
    var leftSide = $('.left-side-container').width();
    var totalWidthToogle = leftSide;
    $('.right-side-col-one, .right-one-fixed-container').width($(window).width() - totalWidthToogle);
}

var ReloadAlldivWidth = function () {
    calcHeight();
    calcWidth();

}

var ResetHeaderCheckBox = function () {
    $(".chkHeader").prop("checked", false);
}

// JavaScript Document
$(document).ready(function () {
    ReloadAlldivWidth();

    //on resize nicescroll start
    $("#menu-scroll-container").mouseover(function () {
        $('#menu-scroll-container').getNiceScroll().resize();
    });
    //on resize nicescroll end

    //for menu-accordian start
    $("#menu-accordian").find('h3').click(function () {
        //slide up all the link lists
        $('#menu-accordian').find('h3').removeClass('menu-active');
        $('#menu-accordian > ul').find('ul').stop().slideUp('fast');
        //slide down the link list below the h3 clicked - only if its closed
        if (!$(this).next().is(':visible')) {
            $(this).next().slideDown('fast');
            $(this).addClass('menu-active');
        }
    });

    $(".overflow-table-contianer").click(function () {
        $('.overflow-table-contianer').addClass('overlfow-visible');
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('#menu-accordian').length) {
            $('#menu-accordian > ul').find('ul').stop().slideUp('fast');
            $('#menu-accordian').find('h3').removeClass('menu-active');
            //   $('#menu-accordian').getNiceScroll().hide();

        }
        if (!$(event.target).closest('.overflow-responsive-contianer').length) {
            $('.overflow-table-contianer').removeClass('overlfow-visible');
        }
    });

    //for report-type-popup start
    if ($('.report-type-popup').length > 0) {
        $('.report-type-popup').magnificPopup({
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: true,
            fixedContentPos: true,
            mainClass: 'mfp-with-zoom report-type-popup', // class to remove default margin from left and right side
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
    }
    //for report-type-popup end
    //for menu-accordian end


    //for notification scroll start
    $('.notification-contianer').find('.dropdown-toggle').on('click', function () {
        $('.notification-contianer').find('.all-notifications').niceScroll({
            cursorborder: "none",
            cursorcolor: "#4E657C",
            cursorwidth: "7px",
            cursorborderradius: "0",
            autohidemode: false,
            background: "#A2B4C7",
            horizrailenabled: false,
            overflowx: false
        });
    });
    $(".notification-contianer").find('.dropdown').mouseover(function () {
        $(".all-notifications").getNiceScroll().resize();
    });
    //for notification scroll end

    //menu scroll start
    $("#menu-scroll-container, .left-side-inner, .right-side-col-one-inner").niceScroll({
        cursorborder: "none",
        cursorcolor: "#6B8ECC",
        cursorwidth: "7px",
        cursorborderradius: "0",
        autohidemode: false,
        background: "#A2B4C7",
        horizrailenabled: false,
        overflowx: false
    });
    //menu scroll end

    //comment-container scroll start
    $(".comment-container, .files-container , .side-task-status, .recent-task-list").niceScroll({
        cursorborder: "none",
        cursorcolor: "#4E657C",
        cursorwidth: "7px",
        cursorborderradius: "0",
        background: "#A2B4C7",
        horizrailenabled: false,
        overflowx: false,
        autohidemode: true
    });
    $(".overflow-table-contianer").niceScroll({
        cursorborder: "none",
        cursorcolor: "#4E657C",
        cursorwidth: "7px",
        cursorborderradius: "0",
        autohidemode: false,
        background: "#A2B4C7"
    });
    $(".task-comment-box").mCustomScrollbar({
        theme: "dark-thin"
    });

    //comment-container scroll end
    $(document).on("mouseenter", ".recent-task-list", function () {
        $(".recent-task-list").getNiceScroll().resize();
    });


    //timesheet-list start
    $('#timesheet-list').jplist({
        itemsBox: '.list'
		, itemPath: '.list-item'
		, panelPath: '.jplist-panel'
    });
    //timesheet-list end

    $('.form-open-btn').click(function (e) {
        $('.common-jplist-container').toggleClass('add-option-form-active');
        $(this).toggleClass('form-open-btn-active');
    });


    //for right-side-col-two start
    $(".main-left-right-container").on("click", ".right-side-col-one-row-hover", function () {
        $('.right-side-container').addClass('right-side-active');
        $('.right-side-toggle-btn').addClass('right-side-active');
        $('.page-inner-container').addClass('custom-right-side-active');
        $('.wrapper').removeClass('menu-toggle-active');
        $('.wrapper').removeClass('side-toggle-active');
        $('.right-side-col-two-inner').getNiceScroll().resize();
        if ($('.wrapper').hasClass('menu-toggle-active')) {
            calcWidthToggle();
        } else {
            calcWidth();
        }
    });
    //for right-side-col-two end

    //for left-side-container toggle start
    $('.side-toggle-btn').click(function (e) {
        $('.wrapper').removeClass('side-toggle-active');
        $('.wrapper').removeClass('menu-toggle-active');
        $('.right-side-container').removeClass('right-side-active');
        $('.right-side-toggle-btn').removeClass('right-side-active');

    });
    //for left-side-container toggle end

    $(".top-side-right").on("click", ".clsAddTask", function () {
        $('.page-inner-container').addClass('custom-right-side-active');
    });
    
    //for right-side-col-two start
    $(".main-left-right-container").on("click", ".right-side-toggle-btn", function () {
        $('.right-side-container').removeClass('right-side-active');
        $(this).removeClass('right-side-active');
        $('.wrapper').removeClass('side-toggle-active');
        $('.page-inner-container').removeClass('custom-right-side-active');
    });
    //for right-side-col-two end



    //for toogle menu start
    $(".search-container").find('.pms-search').click(function () {
        $('.fixed-container').find('.search-form').toggleClass('search-active');
        $('#SerachTask').focus();
    });
    $(".search-form ").find('.pms-close').click(function () {
        $('.fixed-container').find('.search-form').toggleClass('search-active');
    });

    //for tooltip start
    $('[data-toggle="tooltip"]').tooltip();
    //for tooltip end

    //for table start
    if ($("#responsive-table").length > 0) {
        var table = $('#responsive-table').DataTable({
            responsive: true,
            "lengthMenu": [25, 50, 100],
            "order": []
        });

        $('.dataTables_filter').find('input').addClass('form-control');
        $('.dataTables_length').find('select').addClass('form-control');
    }

    if ($("#normal-table").length > 0) {
        var table = $('#normal-table').DataTable({
            "lengthMenu": [25, 50, 100],
            "order": []
        });
        $('.dataTables_filter').find('input').addClass('form-control');
        $('.dataTables_length').find('select').addClass('form-control');

    }
    //for table end

    //for toogle menu start
    $('.menu-toggle-btn').click(function (e) {
        $('.wrapper').toggleClass('menu-toggle-active');
        $('.wrapper').removeClass('side-toggle-active');
        $('.right-side-container').removeClass('right-side-active');
        $('.right-side-toggle-btn').removeClass('right-side-active');
        if ($('.wrapper').hasClass('menu-toggle-active')) {
            calcWidthToggle();
        } else {
            calcWidth();
        }

    });
    //for toogle menu end

    //for multiple select start
    if ($(".chosen-select").length > 0) {
        $(".chosen-select").chosen();
    }
    //for multiple select end
    $('.comment-collapse').hover(function (e) {
        $('.comment-container').getNiceScroll().resize();
    });

    // back to top start
    var offset = 100;
    var duration = 400;
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').slideDown(duration);
        } else {
            $('.back-to-top').slideUp(duration);
        }
    });
    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });
    // back to top end

    //for inline textarea ckeditor start
    var elements = CKEDITOR.document.find('.ck-editor-textarea'),
        i = 0,
        element;
    while ((element = elements.getItem(i++))) {
        CKEDITOR.inline(element);
    }
    

    $(window).resize(function () {
        $('.overflow-table-contianer').getNiceScroll().resize();
        ReloadAlldivWidth();
    });

});
/* center modal start*/
function centerModals() {
    $('.modal').each(function (i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}
$(window).on('resize', centerModals);
/* center modal end*/

/* reinitialize responsive tabel start*/
function reinitializeDataTable() {
    $(".regenerate-table").find("#responsive-table").DataTable({
        responsive: true,
        "lengthMenu": [25, 50, 100],
        "order": []
    });
    $('.dataTables_filter').find('input').addClass('form-control');
    $('.dataTables_length').find('select').addClass('form-control');
}
/* reinitialize responsive tabel end*/