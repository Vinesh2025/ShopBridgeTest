$(document).ready(function () {

    $('body').on('click', '.left-search-btn', function(event) {
         $('body').addClass('left-search-active');
     });
    $('body').on('click', '.left-close-btn', function(event) {
         $('body').removeClass('left-search-active');
     });

    $('[data-toggle="tooltip"]').tooltip(); 

    if ($(".custom-scroll").length > 0) {
         $(".custom-scroll").mCustomScrollbar({
             theme: "dark-thick"
         });
     }
      if ($(".chosen-select").length > 0) {
         $(".chosen-select").chosen({ width: "100%" });
     }
      $('body').on('click', '.edit-text', function(event) {
         $('body').addClass('task-block-active');
     });
      $('body').on('click', '.right-close-btn', function(event) {
         $('body').removeClass('task-block-active');
     });

//$(document).on('click', '.sub-task-btn', function(event) {
//         $(this).parent('div').parent('div').parent('div').addClass('inner-top-task-block-active');
//     });
    //$(document).on('click', '.add-detail', function(event) {
    //     $(this).parent('div').parent('div').parent('div') .addClass('add-detail-active');
    // });
    //$(document).on('click', '.attach-file', function(event) {
    //     $(this).parent('div').parent('div').parent('div') .toggleClass('attach-file-active');
    // });
    //$(document).on('click', '.set-time', function(event) {
    //     $(this).parent('div').toggleClass('set-time-active');
    // });
    //$('.assign-user-block').on('click', '.assign-user', function(event) {
    //     $('.assign-user-block').toggleClass('assign-user-active');
    // });
    //$(document).on('click', '.assign-user', function (event) {
    //     $(this).parent('div').toggleClass('assign-user-active');
    // });
    //$(document).on('click', '.tags', function(event) {
    //     $(this).parent('div').toggleClass('tags-active');
    // });

    //$(document).on('click', '.progress-status', function(event) {
    //     $(this).parent('div').toggleClass('progress-active');
    // });

    $('.due-date').daterangepicker({
    "singleDatePicker": true,
    "startDate": "03/02/2017",
    "endDate": "03/08/2017"
}, function(start, end, label) {
  console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
});
//daterange picker
    //$('a[name="daterange"]').daterangepicker();
    $('#start-date').daterangepicker({
    "singleDatePicker": true,
    "startDate": "02/15/2017",
    "endDate": "02/21/2017"
}, function(start, end, label) {
  console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
});
    $('#end-date').daterangepicker({
    "singleDatePicker": true,
    "startDate": "02/15/2017",
    "endDate": "02/21/2017"
}, function(start, end, label) {
  console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
});

    //toggle `popup` / `inline` mode
    // $.fn.editable.defaults.mode = 'popup';
    $.fn.editable.defaults.mode = 'inline';
    inlineediting();


    $('.project-multiselect').multiselect({
          enableClickableOptGroups: true,
          enableCollapsibleOptGroups: true,
          enableFiltering: true,
          includeSelectAllOption: true,
          dropRight: true,
          numberDisplayed: 0,
          templates: {
              button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',
              ul: '<ul class="multiselect-container dropdown-menu"></ul>',
              filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
              filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span> <span class="input-group-btn"><button id="btnProject-MultiSubmit" Onclick="OnGetProjectsTask()" class="btn" type="button">Submit</button></span>',
              li: '<li><a tabindex="0"><label></label></a></li>',
              divider: '<li class="multiselect-item divider"></li>',
              liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
          }
      });
    if ($(".date-box").length > 0) {
         $('.date-box').datetimepicker({
             format: 'DD/MM/YYYY',
                     });
     }

     if ($(".chosen-select").length > 0) {
         $(".chosen-select").chosen({ width: "100%" });
     }
});

 

/*// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;*/



function inlineediting() {
    //TextBox editable 
    $('#username ,#task-detail').editable({
        url: '/post',
        mode: 'inline',
        showbuttons: false,
        title: 'Enter username'

    });

    // dropdown editable
    $('#status').editable({
        url: '/post',
        type: 'select',
        title: 'Select status',
        placement: 'right',
        showbuttons: false,
        value: 2,
        source: [
            { value: 1, text: 'status 1' },
            { value: 2, text: 'status 2' },
            { value: 3, text: 'status 3' }
        ]
    });

    // Date editable
    $('#dob').editable({



       // url: '/post',
       
       // format: 'yyyy-mm-dd',
      //  viewformat: 'dd/mm/yyyy',
       // datepicker: {
       // weekStart: 1
       // }
    });

    // checklist editeble
    $('#options').editable({
        //url: '/post',
        showbuttons: false,
        value: [1],
        source: [
             // { value: 1, text: 'option1' },
             // { value: 2, text: 'option2' },
              //{ value: 3, text: 'option3' }
        ]
    });

    // Textarea editable
    $('#textArea').editable({
        url: '/post',
        mode: 'inline',
        showbuttons: true
        //title: 'Enter username'
    });
}

function expand(textbox) {
    if (!textbox.startW) { textbox.startW = textbox.offsetWidth; }

    var style = textbox.style;

    //Force complete recalculation of width
    //in case characters are deleted and not added:
    style.width = 0;
    
    var desiredW = textbox.scrollWidth;
    //Optional padding to reduce "jerkyness" when typing:
    desiredW += textbox.offsetHeight;

    style.width = Math.max(desiredW, textbox.startW) + 'px';
}
$(function() {
var $files = $('#uploaded-files');
  
  $('#file-browse').on('click', function(e) {
    $('#Files').trigger('click');
  });
  
  $('#Files').on('change', function(e) {

  }); 
});

//progress-bar
//(function(){

//            var progress = document.querySelector(".js-progress"),
//             progressBar = progress.querySelector(".js-progress__bar"),
//             progressValue = progress.querySelector(".js-progress__value");

//            document.querySelector(".js-value-progress").addEventListener("change", function(){

//                progressBar.value = this.value;
//                progressValue.textContent = this.value + "%";

//            });

//})();

//$(".slides").sortable({
//     placeholder: 'slide-placeholder',
//    axis: "y",
//    revert: 150,
//    start: function(e, ui){
        
//        placeholderHeight = ui.item.outerHeight();
//        ui.placeholder.height(placeholderHeight + 15);
//        $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
    
//    },
//    change: function(event, ui) {
        
//        ui.placeholder.stop().height(0).animate({
//            height: ui.item.outerHeight() + 15
//        }, 300);
        
//        placeholderAnimatorHeight = parseInt($(".slide-placeholder-animator").attr("data-height"));
        
//        $(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight + 15).animate({
//            height: 0
//        }, 300, function() {
//            $(this).remove();
//            placeholderHeight = ui.item.outerHeight();
//            $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
//        });
        
//    },
//    stop: function(e, ui) {
        
//        $(".slide-placeholder-animator").remove();
        
//    },
//});