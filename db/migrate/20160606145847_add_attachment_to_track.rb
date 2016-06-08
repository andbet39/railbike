class AddAttachmentToTrack < ActiveRecord::Migration[5.0]
  def up
    add_attachment :tracks, :track_file
  end

  def down
    remove_attachment :tracks, :track_file
  end
end
