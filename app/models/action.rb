class Action < ApplicationRecord

  belongs_to :action_type
  belongs_to :user

  belongs_to :source, polymorphic: true
  belongs_to :destination, polymorphic: true



end
