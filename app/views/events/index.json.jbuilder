json.array!(@events) do |event|
  json.extract! event, :id, :name, :description, :address, :latitude, :longitude, :start_date
  json.url event_url(event, format: :json)
end
