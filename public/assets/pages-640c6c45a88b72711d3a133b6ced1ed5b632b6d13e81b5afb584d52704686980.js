$(document).ready(function(){function t(t){t.each(function(t,e){"true"==e.getAttribute("value")&&($(this).prop("checked",!0),$(this).closest(".forchack").find(".tasks").toggleClass("stroked"))})}var a,r;$(document).on("click",".checked",function(){var t=$(this).attr("id"),e=$(this),a=e.closest("tr.forchack").find("td.tasks");if("false"==$(this).attr("value"))return $.ajax({method:"POST",url:"/tasks/editTaskStatus/",data:{id:t,value:!0},success:function(){a.toggleClass("stroked"),e.val(!0)}}).error(function(){e.val(!1),e.prop("checked",!1),alert("error")}),!0;$.ajax({method:"POST",url:"/tasks/editTaskStatus/",data:{id:t,value:!1},success:function(){a.removeClass("stroked"),e.val(!1)}}).error(function(){e.val(!0),e.prop("checked",!0),alert("error")})}),t($(".checked")),$(document).on("click",".edit_project_name",function(){if($(this).parents("tr").find(".input-group.edit_project_name").length)return!1;var t=$(this).prop("id"),e=$("#project_name_"+t),a=e.text();e.html(" <div class='input-group edit_project_name'> <input class='form-control edit_project_name_field' placeholder='"+a+"', value='"+a+"' maxlength='50' type='text'> <span class='input-group-btn' value='"+a+"'> <input type='submit' value='Edit Task' class='btn btn-danger edit_project_name_send_ajax' id='bt_"+t+"' data-disable-with='Edit Task'> </span> ")}),$(document).on("click",".edit_project_name_send_ajax",function(){var t=$(this).parent().parent().find("input.form-control.edit_project_name_field").val();if(!t.length)return alert("This field can't be empty"),!1;var e=$(this).attr("id").replace("bt_","");current_project_title=$("#project_name_"+e);var a=$(this).parent(".input-group-btn").attr("value");$.ajax({method:"POST",url:"/projects/editProjectName/",data:{id:e,name:t},success:function(){current_project_title.text(t)}}).error(function(){current_project_title.text(a),alert("error")})}),$(document).on("click",".edit_task_bt",function(){var t=$(this);if(t.parents(".forchack").find(".edit_task_name").length)return!1;var e=t.attr("id").replace("bt_edit_id_",""),a=t.closest("tr.forchack").find(".tasks"),r=a.text();a.html("<div class='input-group edit_task_name'> <input class='form-control edit_task_name_field' placeholder='"+r+"' maxlength='200' value='"+r+"' type='text'> <span class='input-group-btn' value='"+r+"'> <input type='submit' value='Save' class='btn btn-warning edit_task_name_send_ajax' id='bt_edit_id_copy_"+e+"'> </span>")}),$(document).on("click",".edit_task_name_send_ajax",function(){var t=$(this).parent().parent().find("input.form-control.edit_task_name_field").val();if(!t.length)return alert("This field can't be empty"),!1;var e=$(this).attr("id").replace("bt_edit_id_copy_","");current_edited_task=$(this).closest("tr.forchack").find(".tasks");var a=$(this).parent(".input-group-btn").attr("value");$.ajax({method:"POST",url:"/tasks/editTaskName/",data:{id:e,name:t},success:function(){current_edited_task.text(t)}}).error(function(){current_edited_task.text(a),alert("error")})}),$(document).on("click",".glyphicon-calendar.deadline",function(){if($(".temporary").length)$(".temporary").remove(),r.parent().after(a);else{var t=(r=$(this)).parents(".forchack").find(".control");a=t.not(".calendar").detach(),t.after("<td colspan='4' class='temporary'><div class='input-group select_deadline_field_input'> <input class='form-control save_deadline_field datepicker' placeholder='Click here' type='text'> <span class='input-group-btn'> <input type='submit', value='S' class='btn btn-info save_deadline_send_ajax' id='bt_save_deadline'> </span></td>"),$(".datepicker").datepicker({format:"dd.mm.yyyy",todayHighlight:!0,toggleActive:!0,daysOfWeekHighlighted:"06",startDate:new Date,title:'Take the "deadline"',autoclose:!0,weekStart:1})}}),$(document).on("click",".save_deadline_send_ajax",function(){var t=$(this).parents(".select_deadline_field_input").find(".datepicker").val();if(!t.length)return!1;var e=$(this).parents(".forchack").attr("id").replace("tr_task_id_","");$.ajax({method:"POST",url:"/tasks/setDeadline/",data:{id:e,deadline:t},success:function(){$(".temporary").remove(),r.parent().after(a),r.prop("title",t)}}).error(function(){alert("error"),$(".temporary").remove(),r.parent().after(a)})}),$(document).on("click",".glyphicon-arrow-down, .glyphicon-arrow-up",function(){var e=$(this).parents(".forchack"),t=e.attr("id").replace("tr_task_id_",""),a=null,r=-1!=$(this).attr("class").indexOf("down");if((a=r?$(this).parents(".forchack").next(".forchack"):$(this).parents(".forchack").prev(".forchack")).length){var n=a.attr("id").replace("tr_task_id_","");$.ajax({method:"POST",url:"/tasks/swapTasks/",data:{id_one:t,id_two:n},success:function(){if(r){var t=e.detach();a.after(t)}else{t=e.detach();a.before(t)}}})}else alert("Oops")}),$(document).on("submit","#new_project",function(t){$.ajax({method:"POST",url:$(this).attr("action"),data:$(this).serialize(),success:function(t){if($("#new_project")[0].reset(),$("#new_project").find('input[type="submit"]').prop("disabled",!1),$("#modal_add_project").modal("hide"),$(".table.table-hover").length)return $(".table.table-hover").first().before(t),$("html, body").animate({scrollTop:0},"slow",function(){}),!0;$(".row>.target_for_project>.row").before(t)}}),t.preventDefault()}),$(document).on("submit",".new_task",function(t){var e=$(this).find('input[type="text"]'),a=$(this).find('input[type="submit"]'),r=$(this).parents("table").find(".put_task_inside_me"),n=r.children(".forchack").length;n&&(r=r.children(".forchack").first()),$(this).find("input#task_rating").prop("value",$.now()),$.ajax({method:"POST",url:$(this).attr("action"),data:$(this).serialize(),success:function(t){if(a.prop("disabled",!1),e.prop("value",""),n)return r.before(t),!0;r.append(t)}}),t.preventDefault()}),$(document).on("click","th > .glyphicon-trash",function(){var t=$(this).parents("table");$.ajax({success:function(){t.fadeOut("slow",function(){t.remove()})}}).error(function(){alert("error")})}),$(document).on("click","td > .glyphicon-trash",function(){var t=$(this).parents("tr");$.ajax({success:function(){t.fadeOut("slow",function(){t.remove()})}}).error(function(){alert("error")})}),$(document).ajaxStart(function(){$("img.ajax_loader").css("visibility","visible")}),$(document).ajaxStop(function(){$("img.ajax_loader").css("visibility","hidden")})});