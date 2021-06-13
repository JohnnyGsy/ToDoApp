class Project < ActiveRecord::Base
	belongs_to :user
	has_many :tasks, dependent: :destroy
	validates :name,
			 presence: true, #не пустая строка
			 #uniqueness: true, 
			 length: { maximum: 50 }
end
