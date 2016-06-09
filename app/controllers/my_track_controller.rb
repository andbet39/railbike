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

  def find

    @ne_lat = params[:ne_lat]
    @ne_lng = params[:ne_lng]
    @sw_lat = params[:sw_lat]
    @sw_lng = params[:sw_lng]
    @sw = Geokit::LatLng.new(@sw_lat.to_f,@sw_lng.to_f)
    @ne = Geokit::LatLng.new(@ne_lat.to_f,@ne_lng.to_f)
    @ascention_min = params[:asc_min]
    @ascention_max = params[:asc_min]
    @descention_min = params[:desc_min]
    @descention_max = params[:desc_max]
    @distance_min = params[:dist_min]
    @distance_max = params[:dist_max]

    # dist_max=49302&dist_min=2186&asc_min=0&asc_max=10000&desc_min=0&desc_max=10000

    @somewhere = Track.all
    @tracks = Track.in_bounds([@sw, @ne], :origin => @somewhere)

    @tracks=@tracks.where("elevation > ?", params[:asc_min]) if params[:asc_min]
    @tracks=@tracks.where("elevation < ?", params[:asc_max]) if params[:asc_max]
    @tracks=@tracks.where("descent > ?", params[:desc_min]) if params[:desc_min]
    @tracks=@tracks.where("descent < ?", params[:desc_max]) if params[:desc_max]
    @tracks=@tracks.where("distance > ?", params[:dist_min]) if params[:dist_min]
    @tracks=@tracks.where("distance < ?", params[:dist_max]) if params[:dist_max]



    render json: @tracks.as_json, status: :ok

  end

  def get


    @track=Track.find(params[:id])
    render json:@track.as_json(:include=>:points), status: :ok
  end
end
