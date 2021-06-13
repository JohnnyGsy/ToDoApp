class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :status
      t.integer :project_id
      t.integer :rating

      t.timestamps
    end
  end
end
