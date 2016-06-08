json.array!(@tracks) do |track|
  json.extract! track, :id, :name, :description, :elevation, :distance, :start_lat, :start_lng
  json.url track_url(track, format: :json)
end
