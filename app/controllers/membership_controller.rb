class MembershipController < ApplicationController
  def join

    @group = Group.find(params[:group_id])
    @user = current_user

    @group.memberships.create(user_id:@user.id)
    @group.save

    redirect_to :back
  end
end
