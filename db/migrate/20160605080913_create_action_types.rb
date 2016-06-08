class CreateActionTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :action_types do |t|
      t.string :description
      t.string :entity

      t.timestamps
    end
  end
end
