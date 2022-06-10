// JavaScript Document
$(document).ready(function () {

    //on resize nicescroll start
    $("#menu-accordian").mouseover(function () {
        $('#menu-accordian').getNiceScroll().resize();
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

    $(document).on('click', function (event) {
        if (!$(event.target).closest('#menu-accordian').length) {
            $('#menu-accordian > ul').find('ul').stop().slideUp('fast');
            $('#menu-accordian').find('h3').removeClass('menu-active');
            $('#menu-accordian').getNiceScroll().hide();
        }
    });
    //for menu-accordian end
    //menu scroll start
    $("#menu-accordian").niceScroll({
        cursorborder: "none",
        cursorcolor: "#89D6C1",
        cursorwidth: "7px",
        cursorborderradius: "0",
        autohidemode: false,
        background: "#A2B4C7",
        horizrailenabled: false,
        overflowx: false
    });
    //menu scroll end

   

    //datetimepicker1 scroll start
    if ($("#datetimepicker1, #datetimepicker2, #dtpInvoiceDate, #dtpFromDate ,#dtpToDate").length > 0) {
        $('#datetimepicker1, #datetimepicker2, #dtpInvoiceDate, #dtpFromDate ,#dtpToDate').datetimepicker({
            format: 'MM-DD-YYYY'
        });
    }


   

    //datetimepicker1 scroll end

    // chart start
    if ($("#demo-chart").length > 0) {
        Chart.defaults.global.customTooltips = function (tooltip) {

            // Tooltip Element
            var tooltipEl = $('#chartjs-tooltip');

            // Hide if no tooltip
            if (!tooltip) {
                tooltipEl.css({
                    opacity: 0
                });
                return;
            }

            // Set caret Position
            tooltipEl.removeClass('above below');
            tooltipEl.addClass(tooltip.yAlign);

            // Set Text
            tooltipEl.html(tooltip.text);

            // Find Y Location on page
            var top;
            if (tooltip.yAlign == 'above') {
                top = tooltip.y - tooltip.caretHeight - tooltip.caretPadding;
            } else {
                top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
            }

            // Display, position, and set styles for font
            tooltipEl.css({
                opacity: 1,
                left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
                top: tooltip.chart.canvas.offsetTop + top + 'px',
                fontFamily: tooltip.fontFamily,
                fontSize: tooltip.fontSize,
                fontStyle: tooltip.fontStyle,
            });
        };

        var pieData = [{
            value: 60,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Completed"
        }, {
            value: 25,
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "In Progress"
        }, {
            value: 10,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Pending"
        }, {
            value: 5,
            color: "#4D5360",
            highlight: "#616774",
            label: "Future Work"
        }];

        var ctx2 = document.getElementById("demo-chart").getContext("2d");
        window.myPie = new Chart(ctx2).Pie(pieData);
    }
    // chart end

    //for tooltip start
    $('[data-toggle="tooltip"]').tooltip()
    //for tooltip end

    //for table start
    if ($("#responsive-table").length > 0) {
        var table = $('#responsive-table').DataTable({
            responsive: true
        });
        $('.dataTables_filter').find('input').addClass('form-control');
        $('.dataTables_length').find('select').addClass('form-control');

    }

    //for table end

    //for toogle menu start
    $('.menu-toggle-btn').click(function (e) {
        $('.wrapper').toggleClass('menu-toggle-active');
    });
    //for toogle menu end

    //for multiple select start
    if ($(".chosen-select").length > 0) {
        $(".chosen-select").chosen();
    }
    //for multiple select end

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