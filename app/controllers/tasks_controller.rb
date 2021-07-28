  class TasksController < ApplicationController
    before_action :set_task, only: [:destroy, :editTaskName, :editTaskStatus, :setDeadline]
  
   
    def create
      @task = Task.new(task_params) 
      
      respond_to do |format|
        if @task.save
          format.html { render :partial => "tasks/form_for_filling_project_by_one_task", :locals => { :task => @task } } 
        else
          format.html { head :no_content }
        end
      end
    end
  
    def destroy
      @task.destroy
      respond_to do |format|
        format.html { head :no_content }
      end
    end
  
    def editTaskStatus
      @task.update(task_params)
    end 
  
    def editTaskName
      @task.update(task_params)
    end
  
    def setDeadline
      @task.update(task_params)
    end
  
    def swapTasks
      rating_one = Task.find_by(id: params[:id_one]).rating
      rating_two = Task.find_by(id: params[:id_two]).rating
      
      Task.find_by(id: params[:id_one]).update(rating: rating_two)
      Task.find_by(id: params[:id_two]).update(rating: rating_one)
    end
  
    private
     
      def set_task
        @task = Task.find(params[:id] || params[:task][:id])
      end
  
   
      def task_params
        params.require(:task).permit(:rating, :name, :status, :project_id, :value, :deadline)
      end
  end