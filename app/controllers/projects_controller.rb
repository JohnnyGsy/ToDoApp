class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  # GET /projects
  # GET /projects.json
  def index
    @user_id = User.find_by(email: current_user.email).id
    @projects = Project.where(user_id: @user_id)
    @tasks = Task.where(project_id: @projects) #cut down extra projects, list only current user tasks
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
  end

  # GET /projects/new
  def new
    @project = Project.new
    #@user_id = User.find_by(email: current_user.email).id
  end

  # GET /projects/1/edit
  def edit
    #@user_id = User.find_by(email: current_user.email).id
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(project_params)
    @task = Task.new
    respond_to do |format|
      if @project.save
        format.html { render :partial => "pages/project_tables", :locals => { :project => @project } }   #redirect_to todolist_url, notice: 'Project was successfully created.'
                                             # , :locals => { :project => @project }, collection: @task
        #format.json { render action: 'show', status: :created, location: @project }
      else
        format.html { render action: 'new' }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1
  # PATCH/PUT /projects/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to todolist_url, notice: 'Project was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project.destroy
    respond_to do |format|
      format.html { head :no_content } #redirect to To Do List   redirect_to todolist_url
      #format.json { head :no_content }
    end
  end

  def editProjectName
    Project.find_by(id: params[:id]).update(name: params[:name])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:name, :user_id)
    end
end
