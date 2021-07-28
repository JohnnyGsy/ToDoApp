ToDoList::Application.routes.draw do
  devise_for :users
  get 'profile',  to: "persons#profile"
 

  resources :tasks
  resources :projects
  
  post 'tasks/editTaskStatus',      to: 'tasks#editTaskStatus'
  post 'projects/editProjectName',  to: 'projects#editProjectName'
  post 'tasks/editTaskName',        to: 'tasks#editTaskName'
  post 'tasks/setDeadline/',        to: 'tasks#setDeadline'
  post 'tasks/swapTasks',           to: 'tasks#swapTasks'
             
match '/todolist', to: 'pages#todolist', via: 'get'
  
  root 'pages#todolist'


end
