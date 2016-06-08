class Tracksegment < ApplicationRecord
  belongs_to :track
  has_many :points, :dependent => :destroy
end
