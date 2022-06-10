//for ckeditor start
function ckEditor() {
    if ($(".ck-editor-textarea").length > 0) {
        var elements = CKEDITOR.document.find('.ck-editor-textarea'),
            i = 0,
            element;
        while ((element = elements.getItem(i++))) {
            CKEDITOR.inline(element);
        }
    }
}
//for ckeditor end
function forPartialView() {
    //ckEditor();
    inlineediting();
    if ($(".chosen-select").length > 0) {
        $(".chosen-select").chosen({ width: "100%" });
    }
    $('.due-date').daterangepicker({
        "singleDatePicker": true,
        "startDate": "03/02/2017",
        "endDate": "03/08/2017"
    }, function (start, end, label) {
        console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });
    //daterange picker
    //$('a[name="daterange"]').daterangepicker();
    $('#start-date').daterangepicker({
        "singleDatePicker": true,
        "startDate": "02/15/2017",
        "endDate": "02/21/2017"
    }, function (start, end, label) {
        console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });
    $('#end-date').daterangepicker({
        "singleDatePicker": true,
        "startDate": "02/15/2017",
        "endDate": "02/21/2017"
    }, function (start, end, label) {
        console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });

    //$('.common-multiselect').multiselect({
    //    enableClickableOptGroups: true,
    //    enableCollapsibleOptGroups: true,
    //    enableFiltering: true,
    //    includeSelectAllOption: true,
    //    dropRight: true,
    //});
    if ($(".date-box").length > 0) {
        $('.date-box').datetimepicker({
            format: 'DD/MM/YYYY',
        });
    }

    if ($(".custom-scroll").length > 0) {
        $(".custom-scroll").mCustomScrollbar({
            theme: "dark-thick"
        });
    }

    $('.common-multiselect').multiselect({
        enableClickableOptGroups: true,
        enableCollapsibleOptGroups: true,
        enableFiltering: true,
        includeSelectAllOption: true,
        dropRight: true,
        maxHeight: 200,
        templates: {
            button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',
            ul: '<ul class="multiselect-container dropdown-menu"></ul>',
            filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span> <span class="input-group-btn"><button class="btn" type="button">Submit</button></span>',
            li: '<li class="clsSubtaskStatusSelection"><a tabindex="0"><label></label></a></li>',
            divider: '<li class="multiselect-item divider"></li>',
            liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
        }
    });
}
$(document).ready(function () {
    //ckEditor();
    $('body').on('click', '.left-search-btn', function (event) {
        $('body').addClass('left-search-active');
    });
     $('body').on('click', '.left-close-btn', function (event) {
        $('body').removeClass('left-search-active');
    });
    $('body').on('click', '.sidebar-search-btn', function (event) {
        $('body').addClass('sidebar-search-active');
    });
    $('body').on('click', '.close-search-btn', function (event) {
        $('body').removeClass('sidebar-search-active');
    });
   
    $('body').on('click', '.progress-status-box', function (event) {
        $('body').toggleClass('open-progress-status');
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
    $('body').on('click', '.edit-text', function (event) {
        $('body').addClass('task-block-active');
    });
    $('body').on('click', '.right-close-btn', function (event) {
        $('body').removeClass('task-block-active');
    });

    $('body').on('click', '.view-comment-btns', function (event) {
        var TimesheetID = $(this).attr("data-id");
        $(".timesheet-comment").hide();
        if ($('.clsTimesheetComment-' + TimesheetID).hasClass("isShow")) {
            $('.clsTimesheetComment-' + TimesheetID).hide();
            $('.clsTimesheetComment-' + TimesheetID).removeClass("isShow");
        }
        else {
            $('.clsTimesheetComment-' + TimesheetID).addClass("isShow");
            $('.clsTimesheetComment-' + TimesheetID).show();
        }

    });

    $(document).on('click', '.sub-task-btn', function (event) {
        CloseTaskDetailTabs();
        $(this).parent('div').parent('div').parent('div').toggleClass('inner-top-task-block-active');
    });
    $(document).on('click', '.add-detail', function (event) {
        $(this).parent('div').parent('div').parent('div').addClass('add-detail-active');
    });
    $(document).on('click', '.attach-file', function (event) {
        closeActions();
        CloseTaskDetailTabs();
        $(this).parent('div').parent('div').parent('div').parent('div').toggleClass('attach-file-active');
    });
    $(document).on('click', '.set-time', function (event) {
        closeActions();
        $(this).parent('div').toggleClass('set-time-active');
    });
    $(document).on('click', '.add-comments-btn', function (event) {
        closeActions();
        CloseTaskDetailTabs();
        $(this).parent('div').parent('div').parent('div').parent('div').toggleClass('add-comments-btn-active');
    });
    $(document).on('click', '.detail-con-btn', function (event) {
        closeActions();
        $(this).parent('div').parent('div').parent('div').toggleClass('detail-con-btn-active');
    });
    $(document).on('click', '.update-show-box', function (event) {
        closeActions();
        $(this).parent('div').parent('div').parent('div').toggleClass('update-show-box-active');
    });


    //$('.assign-user-block').on('click', '.assign-user', function(event) {
    //     $('.assign-user-block').toggleClass('assign-user-active');
    // });
    $(document).on('click', '.assign-user', function (event) {
        closeActions();
        //alert("test");
        //$(this).parent('div').toggleClass('assign-user-active');
    });
    $(document).on('click', '.tags', function (event) {
        closeActions();
        $(this).parent('div').toggleClass('tags-active');
    });

    //$(document).on('click', '.progress-status', function (event) {
    //    //closeActions();
    //    //$(this).parent('div').toggleClass('progress-active');
    //});
    $(document).on('click', '.description-box', function (event) {
        $(this).parent('div').addClass('description-box-active');
    });

   

    $('.due-date').daterangepicker({
        "singleDatePicker": true,
        "startDate": "03/02/2017",
        "endDate": "03/08/2017"
    }, function (start, end, label) {
        console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });
    //daterange picker
    //$('a[name="daterange"]').daterangepicker();
    $('#start-date').daterangepicker({
        "singleDatePicker": true,
        "startDate": "02/15/2017",
        "endDate": "02/21/2017"
    }, function (start, end, label) {
        console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });
    $('#end-date').daterangepicker({
        "singleDatePicker": true,
        "startDate": "02/15/2017",
        "endDate": "02/21/2017"
    }, function (start, end, label) {
        console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });

    //toggle `popup` / `inline` mode
    // $.fn.editable.defaults.mode = 'popup';
    $.fn.editable.defaults.mode = 'inline';
    inlineediting();


    //$('.common-multiselect').multiselect({
    //    enableClickableOptGroups: true,
    //    enableCollapsibleOptGroups: true,
    //    enableFiltering: true,
    //    includeSelectAllOption: true,
    //    dropRight: true,
    //});

    //$('.common-multiselect').multiselect({
    //    enableClickableOptGroups: true,
    //    enableCollapsibleOptGroups: true,
    //    enableFiltering: true,
    //    includeSelectAllOption: true,
    //    dropRight: true,
    //    templates: {
    //        button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',
    //        ul: '<ul class="multiselect-container dropdown-menu"></ul>',
    //        filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
    //        filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span> <span class="input-group-btn"><button class="btn" type="button">Submit</button></span>',
    //        li: '<li class="clsSubtaskStatusSelection"><a tabindex="0"><label></label></a></li>',
    //        divider: '<li class="multiselect-item divider"></li>',
    //        liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
    //    }
    //});


    if ($(".date-box").length > 0) {
        $('.date-box').datetimepicker({
            format: 'DD/MM/YYYY',
        });
    }

    //var slider = new Slider("#ex6");
    //slider.on("slide", function (sliderValue) {
    //    document.getElementById("ex6SliderVal").textContent = sliderValue;
    //});
});

function CloseTaskDetailTabs() {
    $(".element-outer-box").attr("class", "element-outer-box");  
    $(".element-action-box ").attr("class", "element-action-box");
}

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

function closeActions() {
    $(".assign-user-block").removeClass("assign-user-active");
    $(".set-timer-block").removeClass("set-time-active");
    $(".progress-status-block").removeClass("progress-active");
    $(".tags-block").removeClass("tags-active");
    $(".attach-file-active").removeClass("attach-file-active");
}

function inlineediting() {
    $.fn.editable.defaults.mode = 'inline';


    //$('#TaskDescription').editable({
    //    //url: '/post',
    //    name: "Description",
    //    mode: 'inline',
    //    showbuttons: false,
    //    title: 'Enter description',
    //    inputclass: 'taskdescription-select',
    //    emptytext: 'Description hee',
    //    url: function (params) {
    //        var TaskID = $("#SelectedTaskID").val();
    //        var model = {
    //            "TaskID": TaskID,
    //            "Summary": params.value
    //        }
    //        $.ajax({
    //            url: "/MyTasks/OnSummaryChange",
    //            data: model,
    //        });
    //    },
    //    validate: function (value) {
    //        if ($.trim(value) == '')
    //            return 'Taskname is required';

    //        var nameLength = value.length;
    //        if (nameLength > 100) {
    //            return 'Maximum 100 Characters Allowed.';
    //        }
    //    }
    //});




    //TextBox editable 
    $('#username ,#task-detail').editable({
        //url: '/post',
        name: "username",
        mode: 'inline',
        showbuttons: false,
        title: 'Enter username',
        inputclass: 'subtask-select',
        emptytext: 'New SubTask',
        url: function (params) {
           
            var TaskID = $(this).closest('.ClsSubTaskList').children().attr("data-id");
            $(".clsDetailSubTask-" + TaskID).editable("setValue", params.value);
            var model = {
                "TaskID": TaskID,
                "TaskName": params.value
            }
           
             $.ajax({
                url: "/MyTasks/OnSubTaskNameChange",
                data: model,
                success: function (response) {
                    toastr.success(params.value + ' Subtask updated successfully.', 'Success', { timeOut: 5000, positionClass: "toast-bottom-right", closeButton: true })
                }
            });
        },
        validate: function (value) {
            if ($.trim(value) == '')
                return 'Taskname is required';

            var nameLength = value.length;
            if (nameLength > 100) {
                return 'Maximum 100 Characters Allowed.';
            }
        }
    });

    $('#task-detail-subtask,#task-detail').editable({
        //url: '/post',
        name: "subtask",
        mode: 'inline',
        showbuttons: false,
        title: 'Enter Sub TaskName',
        inputclass: 'task-detail-subtask-select',
        emptytext: 'New SubTask',
        validate: function (value) {
            if ($.trim(value) == '')
                return 'TaskName is required';
        }
    });

    $('#task-detail-taskname').editable({
        //url: '/post',
        name: "username",
        mode: 'inline',
        showbuttons: false,
        title: 'Enter Taskname',
        inputclass: 'taskdetail-maintask-name',
    });



    

    $('#newsubtask').editable({
        showbuttons: false,
        unsavedclass: null,
        type: 'text',
        inputclass: 'newsubtask-select',
        //mode: 'inline'
        emptytext: 'New SubTask',
        validate: function (value) {
            if ($.trim(value) == '')
                return 'Taskname is required';

            var nameLength = value.length;
            if (nameLength > 100) {
                return 'Maximum 100 Characters Allowed.';
            }

        },
        url: function (params) {
            var TaskID = $(".HiddenSelectedTaskID").val();
            var model = {
                "TaskID": TaskID,
                "TaskName": params.value
            }
            $("#dvLoading").show();
             $.ajax({
                url: "/MyTasks/AddNewTaskSubTask",
                data: model,
                success: function (response) {
                    $("#divSubTasklist").before(response);
                    $("#newsubtask").editable("setValue", "");
                    $('#username ,#task-detail').editable({
                        name: "username",
                        mode: 'inline',
                        showbuttons: false,
                        title: 'Enter username',
                        inputclass: 'subtask-select',
                        emptytext: 'SubTask Name',
                    });
                    $("#newsubtask").editable("setValue", "");
                    $("#divnoSubtask").hide();
                    $("#dvLoading").hide();
                    toastr.success(params.value +' Subtask created successfully.', 'Success', { timeOut: 5000, positionClass: "toast-bottom-right", closeButton: true })
                },
                error: function () {
                    $("#dvLoading").hide();
                    alert("Something happened wrong !");
                }
            });
        },
    });
    $('#subtask').editable({
        showbuttons: false,
        unsavedclass: null,
        type: 'text',
        inputclass: 'input-medium subtask-select',
        mode: 'inline',
        emptytext: 'SubTask',
    });

    // dropdown EstimatedHours
    //$('#EstimatedHours').editable({
    //    showbuttons: false,
    //    unsavedclass: null,
    //    type: 'text',
    //    inputclass: 'estimatedhours-select',
    //    mode: 'popup',
    //    emptytext: 'Hours',
    //});
    // dropdown editable

    $('#taskstatusupdate').editable({
        showbuttons: false,
        unsavedclass: null,
        type: 'text',
        inputclass: 'input-medium taskstatusupdate-select',
        mode: 'inline',
        emptytext: 'Update status',
    });


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
$(function () {
    var $files = $('#uploaded-files');

    $('#file-browse').on('click', function (e) {
        $('#Files').trigger('click');
    });

    $('#Files').on('change', function (e) {

    });
});

//$('body').on('click', '.discussion-comment', function (event) {
//    $('body').addClass('open-right-discussion-comment');
//});

$('body').on('click', '.close-discussion-comment', function (event) {
    $('body').removeClass('open-right-discussion-comment');
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