class MapController < ApplicationController
  def index
    @events = Event.all
    @hash = Gmaps4rails.build_markers(@events) do | event, marker|
      marker.lat event.latitude
      marker.lng event.longitude
    end

    @track =Track.all.first



  end
end
