class CreateActions < ActiveRecord::Migration[5.0]
  def change
      create_table :actions do |t|
        t.integer :action_type_id
        t.integer :source_id
        t.string  :source_type
        t.integer :destination_id
        t.string  :destination_type
        t.integer :user_id
        t.timestamps null: false
    end
  end
end
