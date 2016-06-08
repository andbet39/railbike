class AddTrackToEvent < ActiveRecord::Migration[5.0]
  def change
    add_reference :events, :track, foreign_key: false
  end
end
