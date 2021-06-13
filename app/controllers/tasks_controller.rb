class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  # GET /tasks
  # GET /tasks.json
  def index
    @projects = Project.where(user_id: User.find_by(email: current_user.email).id) #current user projects

    @tasks = Task.where(project_id: @projects)
    
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
    @project_id = '' #WTF?
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params) 

    @projects = Project.where(user_id: User.find_by(email: current_user.email).id) #current user projects
    @tasks = Task.where(project_id: @projects)

    respond_to do |format|
      if @task.save
        format.html { render :partial => "pages/form_for_filling_project_by_one_task", :locals => { :task => @task } } # redirect_to todolist_url, notice: 'Task was successfully created.'
        #format.json { render action: 'show', status: :created, location: @task }
      else
        format.html { render action: 'new' }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to @task, notice: 'Task was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      format.html { head :no_content }
      #format.json { head :no_content }
    end
  end

  def editTaskStatus
     Task.find_by(id: params[:id]).update(status: params[:value])
  end 

  def editTaskName
    Task.find_by(id: params[:id]).update(name: params[:name])
  end

  def setDeadline
    Task.find_by(id: params[:id]).update(deadline: params[:deadline])
  end

  def swapTasks
    rating_one = Task.find_by(id: params[:id_one]).rating
    rating_two = Task.find_by(id: params[:id_two]).rating
    
    Task.find_by(id: params[:id_one]).update(rating: rating_two)
    Task.find_by(id: params[:id_two]).update(rating: rating_one)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      
      #params[:project_id] = Project.find(8)
      params.require(:task).permit(:rating, :name, :status, :project_id, :value, :deadline)
    end
end
  #def editTaskStatus
  #  Tasks.find_by(id: task_params[:id]).update(status: task_params[:value])
  #end 