class Partecipation < ApplicationRecord
  belongs_to :user
  belongs_to :event


  after_create_commit :create_action


  def create_action
    @action= Action.create(source:self.event.group,destination:self.event,user:self.user,action_type_id:5)
    @action.save
  end

end
