class Post < ApplicationRecord
  belongs_to :user
  belongs_to :destination ,polymorphic: true

  after_create_commit :create_action


  def create_action
    @action= Action.create(source:self.destination,destination:self,user:self.user,action_type_id:3)
    @action.save

  end
end
