class CreateTrainingVideos < ActiveRecord::Migration[5.0]
  def change
    create_table :training_videos do |t|
      t.string :name, null: false
      t.text :link, null: false 
      t.belongs_to :training_section, foreign_key: true

      t.timestamps
    end
  end
end
