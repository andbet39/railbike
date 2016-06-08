class AddRenderCompToAction < ActiveRecord::Migration[5.0]
  def change
    add_column :action_types, :react_component,:string
  end
end
