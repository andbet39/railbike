class CreateTracksegments < ActiveRecord::Migration[5.0]
  def change
    create_table :tracksegments do |t|
      t.references :track, foreign_key: true

      t.timestamps
    end
  end
end
