class ChangeIntegerLimitInTasksRating < ActiveRecord::Migration[6.1]
	def change
     change_column :tasks, :rating, :integer, limit: 8
   	end 
end
