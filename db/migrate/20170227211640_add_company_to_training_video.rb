class AddCompanyToTrainingVideo < ActiveRecord::Migration[5.0]
  def change
    add_reference :training_videos, :company, foreign_key: true
  end
end
