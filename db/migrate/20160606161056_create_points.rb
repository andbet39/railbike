class CreatePoints < ActiveRecord::Migration[5.0]
  def change
    create_table :points do |t|
      t.references :tracksegment, foreign_key: true
      t.string :name
      t.float :latitude
      t.float :longitude
      t.float :elevation
      t.string :description
      t.datetime :point_created_at

      t.timestamps
    end
  end
end
