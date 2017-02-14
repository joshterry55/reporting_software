class AddCompanyToTrainingSection < ActiveRecord::Migration[5.0]
  def change
    add_reference :training_sections, :company, foreign_key: true
  end
end
