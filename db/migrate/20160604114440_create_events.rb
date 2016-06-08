class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :name
      t.string :description
      t.datetime :start_date
      t.float :latitude
      t.float :longitude
      t.string :address
      t.timestamps
    end
  end
end
