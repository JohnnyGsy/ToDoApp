$(document).ready(function() {

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
  
    $(document).on("click", ".checked", function(e){
          var taskId = $(this).attr('id');
          var thisChackBox = $(this);
          var task_object = thisChackBox.closest("tr.forchack").find("td.tasks");
  
          if ($(this).attr('value') == 'false') { /* value change to -> status and in view also*/
  
                $.ajax({
                        method: "POST",
                        url: "/tasks/editTaskStatus/",
                        data: { task: {id: taskId, status: true} },
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
                        data: { task: {id: taskId, status: false} },
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
  
    $(document).on("click", ".edit_task_bt", function(event){         /*add field for edit task in projects*/
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
                data: { task: {id: current_task_id, name: new_name_of_task} },
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
  
    $(document).on("click", ".save_deadline_send_ajax", function(e){                                  /*****set deadline for task*****/
      var show_deadline = $(this).parents(".forchack").children(".control_left_side").find(".checked").val()  //checkbox
      var day_of_deadline = $(this).parents(".select_deadline_field_input").find(".datepicker").val();
      if(day_of_deadline.length){ /*if field is not empty*/
      var task_id = $(this).parents(".forchack").attr('id').replace('tr_task_id_', '');
        $.ajax({
          method: "POST",
          url: "/tasks/setDeadline/",
          data: { task: {id: task_id, deadline: day_of_deadline} },
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
  
    function strokeCheckedTasks(e){		//strocked//
          e.each(function(i,elem){
            if (elem.getAttribute('value') == 'true') {
            $(this).prop( "checked", true ); /*add checked to chack_box_tag*/
                $(this).closest(".forchack").find(".tasks").toggleClass('stroked');   
          }
          });
      };
  
      strokeCheckedTasks($(".checked")); /*set chaced and strocked for all tasks*/   
  
  });