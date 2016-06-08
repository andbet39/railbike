class MygroupController < ApplicationController
  def index
    @groups = Group.all
  end

  def show
    @group = Group.find(params[:id])

    @events = @group.events

    @hash = Gmaps4rails.build_markers(@events) do | event, marker|
      marker.lat event.latitude
      marker.lng event.longitude
    end

    @actions = Action.where(source_type:'Group',source_id:@group.id).order(created_at: :desc)

    @posts = Post.where(destination_type:"Group",destination_id:@group.id).order(created_at: :desc)
    @post = Post.new
    @post.destination = @group
    @post.user = current_user

  end

  def add_post
    @post = Post.new()
    @post.destination_id= params[:destination_id]
    @post.user= current_user
    @post.destination_type= params[:destination_type]
    @post.content= params[:content]

    @post.save
  end
end


