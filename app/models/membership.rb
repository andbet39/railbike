class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group


  after_create_commit :create_action


  def create_action
    @action= Action.create(source:self.group,destination:self.group,user:self.user,action_type_id:2)
    @action.save

  end
end
