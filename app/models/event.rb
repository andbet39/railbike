class Event < ApplicationRecord
  geocoded_by :address
  after_validation :geocode

  belongs_to :track

  belongs_to :group
  belongs_to :user

  has_many :partecipations
  has_many :users, through: :partecipations

  after_create_commit :create_action

  def create_action
    @action= Action.create(source:self.group,destination:self,user:self.user,action_type_id:1)
    @action.save

  end
end
