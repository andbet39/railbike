class AddVisibleToActionType < ActiveRecord::Migration[5.0]
  def change
     add_column :action_types, :timeline_visible_flg,:boolean
  end
end
