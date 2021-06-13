json.array!(@tasks) do |task|
  json.extract! task, :id, :name, :status, :project_id, :rating
  json.url task_url(task, format: :json)
end
