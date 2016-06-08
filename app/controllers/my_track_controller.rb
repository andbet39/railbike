class MyTrackController < ApplicationController
  def index
  end

  def findInBound

    @ne_lat = params[:ne_lat]
    @ne_lng = params[:ne_lng]
    @sw_lat = params[:sw_lat]
    @sw_lng = params[:sw_lng]
    @sw = Geokit::LatLng.new(@sw_lat.to_f,@sw_lng.to_f)
    @ne = Geokit::LatLng.new(@ne_lat.to_f,@ne_lng.to_f)

    @somewhere = Track.all
    @tracks = Track.in_bounds([@sw, @ne], :origin => @somewhere)

    render json: @tracks.as_json, status: :ok

  end

  def get


    @track=Track.find(params[:id])
    render json:@track.as_json(:include=>:points), status: :ok
  end
end
