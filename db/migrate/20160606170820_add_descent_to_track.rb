class AddDescentToTrack < ActiveRecord::Migration[5.0]
  def change
    add_column :tracks, :descent, :float
  end
end
