class ProjectsController < ApplicationController
  before_action :set_project, only: [ :destroy, :editProjectName ] #:show, :edit, :update

  # POST /projects
  def create
    @project = Project.new(project_params) 
    @task = Task.new

    respond_to do |format|
      if @project.save
        format.html { render :partial => "projects/show_project", :locals => { :project => @project } } 
        #format.json { render action: 'show', status: :created, location: @project }
      else
        format.html { render html: "Error, can not save... reload page and try again" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    respond_to do |format|
      format.html { head :no_content } 
      #format.json { head :no_content }
    end
  end

  def editProjectName
    if have_access(@project) then 
      @project.update(project_params)
    else 
      flash[:warning] = "Something went wrong, try again. Can not find project by given id or you have no permission"
      #render html: 'can not find project by given id or you have no permission'
    end
  end

  private
    def have_access(project)
     return true if project  && (project.user_id == current_user.id)  
     false   
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_project
         @project = Project.find(params[:id] || params[:project][:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:name, :user_id)
    end
end