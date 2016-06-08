class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks do |t|
      t.string :name
      t.string :description
      t.float :elevation
      t.float :distance
      t.float :start_lat
      t.float :start_lng

      t.timestamps
    end
  end
end
