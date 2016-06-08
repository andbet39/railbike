class Track::BuildController < ApplicationController
  include Wicked::Wizard

  steps :add_info, :done

  def new
    @track = Track.new
  end

  def show
    @track = Track.find(params[:track_id])
    render_wizard
  end


  def update
    @track = Track.find(params[:track_id])
    @track.update_attributes(track_params)
    render_wizard @track
  end


  def create
    @track = Track.new(track_params)
    if @track.save
      redirect_to wizard_path(steps.first, :track_id => @track.id)
    end
  end

  def track_params
    params.require(:track).permit(:name, :description, :elevation, :distance, :start_lat, :start_lng,:track_file,:descent)
  end
end

