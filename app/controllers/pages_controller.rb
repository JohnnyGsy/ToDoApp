class PagesController < ApplicationController
  
  def todolist
  	@user_id = User.find_by(email: current_user.email).id

  	@projects = Project.where(user_id: @user_id).order(created_at: :desc) #current user projects
  	@project = Project.new

  	@tasks = Task.where(project_id: @projects).order(rating: :desc) #cut down extra projects, list only current user tasks
    @task = Task.new
  end



end
