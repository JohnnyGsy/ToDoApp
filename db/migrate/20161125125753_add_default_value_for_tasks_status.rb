class AddDefaultValueForTasksStatus < ActiveRecord::Migration[6.1]
  def up
  	change_column :tasks, :status, :boolean, :default => false
  end
end
