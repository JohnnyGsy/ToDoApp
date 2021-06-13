class Task < ActiveRecord::Base
	belongs_to :project
	validates :name,
			 presence: true, #не пустая строка
			 length: { maximum: 200 }
end
