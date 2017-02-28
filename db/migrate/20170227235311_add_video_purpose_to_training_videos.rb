class AddVideoPurposeToTrainingVideos < ActiveRecord::Migration[5.0]
  def change
    add_column :training_videos, :video_purpose, :string
  end
end
