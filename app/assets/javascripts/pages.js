$(document).ready(function() {
	

    $(document).on("click", ".checked", function(e){
        var taskId = $(this).attr('id');
        var thisChackBox = $(this);
        var task_object = thisChackBox.closest("tr.forchack").find("td.tasks");

    	if ($(this).attr('value') == 'false') {

              $.ajax({
                      method: "POST",
                      url: "/tasks/editTaskStatus/",
                      data: {id: taskId, value: true},
                      success: function(data) { 
                        task_object.toggleClass('stroked');
                        thisChackBox.val(true);
                      }

                    })
                        .error(function (a) {
                          thisChackBox.val(false);
                          thisChackBox.prop("checked", false);
                          alert('error');
                        });
          return true;
    	}else{
              $.ajax({
                      method: "POST",
                      url: "/tasks/editTaskStatus/",
                      data: {id: taskId, value: false},
                      success: function(data) { 
                        task_object.removeClass('stroked');
                        thisChackBox.val(false);
                      }
                      
              })
                  .error(function (a) {
                    thisChackBox.val(true);
                    thisChackBox.prop("checked", true);
                    alert('error');
                  });

    	}
      
    });
   

    function strokeCheckedTasks(e){		//strocked//
    	e.each(function(i,elem){
    	  if (elem.getAttribute('value') == 'true') {
          $(this).prop( "checked", true ); /*add checked to chack_box_tag*/
    	  	$(this).closest(".forchack").find(".tasks").toggleClass('stroked');   
        }
    	});
    };

    strokeCheckedTasks($(".checked")); /*set chaced and strocked for all tasks*/   

  
  $(document).on("click", ".edit_project_name", function(e){ /* call form for edit project name */
    var already_has_input = $(this).parents("tr").find(".input-group.edit_project_name").length;
    if(already_has_input){
        return false;
    }else{
      var project_id = $(this).prop('id');
      var project_title = $("#project_name_" + project_id);/*select by  project_name_id*/
      var old_project_name = project_title.text();   
      project_title.html(" <div class='input-group edit_project_name'> <input class='form-control edit_project_name_field' placeholder='"+old_project_name+"', value='"+old_project_name+"' maxlength='50' type='text'> <span class='input-group-btn' value='"+old_project_name+"'> <input type='submit' value='Edit Task' class='btn btn-danger edit_project_name_send_ajax' id='bt_"+project_id+"' data-disable-with='Edit Task'> </span> ");    
    }
  });

  $(document).on("click", ".edit_project_name_send_ajax", function(e){              /* edit project name with Ajax */
    var new_name_of_project = $(this).parent().parent().find("input.form-control.edit_project_name_field").val();
    if(!new_name_of_project.length){
      alert('This field can\'t be empty');
      return false;
    }
    var current_project_id = $(this).attr('id').replace('bt_', '');
    current_project_title = $("#project_name_" + current_project_id);
    var old_project_name_for_current_project = $(this).parent(".input-group-btn").attr('value');
    
              $.ajax({
                      method: "POST",
                      url: "/projects/editProjectName/",
                      data: {id: current_project_id, name: new_name_of_project},
                      success: function(data) { 
                        current_project_title.text(new_name_of_project);                  
                      }         
                    })
                        .error(function (a) {
                          current_project_title.text(old_project_name_for_current_project);
                          alert('error');
                        });
  });

  $(document).on("click", ".edit_task_bt", function(e){         /*edit task in projects*/
    var this_elem = $(this);
    var already_has_input = this_elem.parents(".forchack").find(".edit_task_name").length;
    if(already_has_input){
        return false;
      }else{
        var task_id = this_elem.attr('id').replace('bt_edit_id_', '');
        var editable_field = this_elem.closest("tr.forchack").find(".tasks");
        var editable_text = editable_field.text();
        editable_field.html("<div class='input-group edit_task_name'> <input class='form-control edit_task_name_field' placeholder='"+editable_text+"' maxlength='200' value='"+editable_text+"' type='text'> <span class='input-group-btn' value='"+editable_text+"'> <input type='submit' value='Save' class='btn btn-warning edit_task_name_send_ajax' id='bt_edit_id_copy_"+task_id+"'> </span>");
      }
  });

  $(document).on("click", ".edit_task_name_send_ajax", function(e){              /* edit task name with Ajax */
    var new_name_of_task = $(this).parent().parent().find("input.form-control.edit_task_name_field").val();
    if(!new_name_of_task.length){
      alert('This field can\'t be empty');
      return false;
    }
    var current_task_id = $(this).attr('id').replace('bt_edit_id_copy_', '');
    current_edited_task = $(this).closest("tr.forchack").find(".tasks");
    var old_task_name_for_current_project = $(this).parent(".input-group-btn").attr('value');
    
        $.ajax({
              method: "POST",
              url: "/tasks/editTaskName/",
              data: {id: current_task_id, name: new_name_of_task},
              success: function(data) { 
                current_edited_task.text(new_name_of_task); 
              }
        })
          .error(function (a) {
            current_edited_task.text(old_task_name_for_current_project);
            alert('error');
          });

  });

  var for_replace_controls_bt;
  var this_dedline_calc;                                     
  $(document).on("click", ".glyphicon-calendar.deadline", function(){        /***** deadline datepicker *****/
    if($(".temporary").length) {
      $(".temporary").remove();
      this_dedline_calc.parent().after(for_replace_controls_bt);
    }else{
      this_dedline_calc = $(this);
      var all_controls_bt = this_dedline_calc.parents(".forchack").find(".control");
      for_replace_controls_bt = all_controls_bt.not(".calendar").detach();
      all_controls_bt.after("<td colspan='4' class='temporary'><div class='input-group select_deadline_field_input'> <input class='form-control save_deadline_field datepicker' placeholder='Click here' type='text'> <span class='input-group-btn'> <input type='submit', value='S' class='btn btn-info save_deadline_send_ajax' id='bt_save_deadline'> </span></td>");
  
      $(".datepicker").datepicker({ 
        format: 'dd.mm.yyyy',  // Date Format used
        todayHighlight: true,
        toggleActive: true,
        daysOfWeekHighlighted: '06',
        startDate: new Date(),
        title: 'Take the "deadline"',
        autoclose: true,
        weekStart: 1
      });
    }

  });

  $(document).on("click", ".save_deadline_send_ajax", function(e){                                  /*****set deadline*****/
    var day_of_deadline = $(this).parents(".select_deadline_field_input").find(".datepicker").val();
    if(day_of_deadline.length){ /*if field is not empty*/
    var task_id = $(this).parents(".forchack").attr('id').replace('tr_task_id_', '');
    
      $.ajax({
        method: "POST",
        url: "/tasks/setDeadline/",
        data: {id: task_id, deadline: day_of_deadline},
        success: function(data) { 
          $(".temporary").remove();
          this_dedline_calc.parent().after(for_replace_controls_bt);
          this_dedline_calc.prop('title', day_of_deadline);         
        }
      })
        .error(function (a) {
          alert('error');
          $(".temporary").remove();
          this_dedline_calc.parent().after(for_replace_controls_bt);
        });
    }else{
      return false; /*if field is empty*/
    }
  });
  $(document).on("click", ".glyphicon-arrow-down, .glyphicon-arrow-up", function(){          /*****swap tasks*****/
    var current_row = $(this).parents(".forchack");
    var task_id_one = current_row.attr('id').replace('tr_task_id_', '');
    var other_row = null;
    var it_is_down = $(this).attr('class').indexOf('down') != -1;

    if(it_is_down){
      other_row = $(this).parents(".forchack").next(".forchack");
    }else{
      other_row = $(this).parents(".forchack").prev(".forchack");
    }  
    
    if(other_row.length){
      var task_id_two = other_row.attr('id').replace('tr_task_id_', '');

      $.ajax({
          method: "POST",
          url: "/tasks/swapTasks/",
          data: {id_one: task_id_one, id_two: task_id_two},
                  
          success: function(data) { 
            if(it_is_down){
              var new_position_row = current_row.detach();
              other_row.after(new_position_row);
            }else{
              var new_position_row = current_row.detach();
              other_row.before(new_position_row);
             }
          }             
      })                  
    }else{ alert("Oops"); }
  });


  $(document).on("submit", "#new_project", function(e){  /* Create new project Ajax */
    
    $.ajax({
          method: "POST",
          url: $(this).attr('action'), /*insted of '/projects/' */
          data: $(this).serialize(),
                  
          success: function(h) { 
            $("#new_project")[0].reset();
            $("#new_project").find('input[type="submit"]').prop('disabled', false);
            $('#modal_add_project').modal('hide');
            if($(".table.table-hover").length){
              $(".table.table-hover").first().before(h);
              $('html, body').animate({ scrollTop: 0 }, 'slow', function () { /*here will be animstion*/ });
              return true;
            }
            $(".row>.target_for_project>.row").before(h);
          } 
    })
    e.preventDefault();
  });

$(document).on("submit", ".new_task", function(e){  /* Add new Task to project Ajax */  /**/
    var input = $(this).find('input[type="text"]');
    var bt = $(this).find('input[type="submit"]');
    var put_here = $(this).parents("table").find(".put_task_inside_me");
    var has_row = put_here.children(".forchack").length;
    if(has_row){
      put_here = put_here.children(".forchack").first();
    }
    $(this).find('input#task_rating').prop('value', $.now());  /*set date/time for rating*/
    $.ajax({
          method: "POST",
          url: $(this).attr('action'), /*insted of '/projects/' */
          data: $(this).serialize(),
                  
          success: function(h) {
            bt.prop('disabled', false);
            input.prop('value', '');
            if(has_row){
              put_here.before(h);
              return true;
            }
            put_here.append(h);
          } 
    })
    e.preventDefault();
  });

  $(document).on("click", "th > .glyphicon-trash", function(e){  /* remove project Ajax */
    var this_table = $(this).parents("table"); //$(this).parents("table").nextAll("br")
    $.ajax({
          success: function(h) {
            this_table.fadeOut( "slow", function(){
              this_table.remove();
            }); 
          }
    })
    .error(function (a) {
        alert('error');
    });
  });

  $(document).on("click", "td > .glyphicon-trash", function(e){  /* remove task  Ajax */
    var this_row = $(this).parents("tr");
    $.ajax({
          success: function(h) {
            this_row.fadeOut( "slow", function(){
              this_row.remove();
            }); 
          }
    })
    .error(function (a) {
        alert('error');
    });
  });
  /*validations*/
  /*$('.new_task form').formValidation({
        framework: 'bootstrap',
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        // Feedback icons
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            'task[name]': {
                validators: {
                    notEmpty: {
                        message: 'Task can not be empty'
                    },
                    stringLength: {
                        message: 'Task content must be less than 200 characters',
                        max: function (value, validator, $field) {
                            return 6 - (value.match(/\r/g) || []).length;
                        }
                    }
                }
            }
        }

        /*put here new fields*/
   /* });*/
   
  $( document ).ajaxStart(function() {
    $( "img.ajax_loader").css('visibility','visible');
  });
  $( document ).ajaxStop(function() {
    $( "img.ajax_loader").css('visibility','hidden');
  });
 });