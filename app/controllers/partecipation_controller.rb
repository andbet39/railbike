class PartecipationController < ApplicationController

  protect_from_forgery with: :null_session

  def partecipate
    @event = Event.find(params[:event_id])
    @partecipation = @event.partecipations.create(user_id:params[:user_id])

    if @event.save
      render json: @partecipation.as_json(:include=>:user), status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def remove_partecipate
    @event = Event.find(params[:event_id])
    @partecipation = Partecipation.where(user_id:params[:user_id],event_id:params[:event_id])
    @event.partecipations.delete(@partecipation)

    if @event.save
      render json: @partecipation.as_json(:include=>:user), status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def partecipantsByEvent
    @partecipations = Partecipation.where(event_id: params[:event_id]).includes(:user)

    render json:@partecipations.as_json(:include=>:user),status: :ok

  end
end
