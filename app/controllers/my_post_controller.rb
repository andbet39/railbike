class MyPostController < ApplicationController
  def create
    @post= Post.new
  end
end
