$(document).ready(function() {

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
                        data: { project: {id: current_project_id, name: new_name_of_project} }, /*send to project_params*/
                        success: function(data) { 
                          current_project_title.text(new_name_of_project);                  
                        }         
                      })
                          .error(function (a) {
                            current_project_title.text(old_project_name_for_current_project);
                            alert('error');
                          });
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
  
  });