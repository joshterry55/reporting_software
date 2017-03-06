class CreateCompetitions < ActiveRecord::Migration[5.0]
  def change
    create_table :competitions do |t|
      t.belongs_to :company, foreign_key: true
      t.string :name
      t.date :start_date
      t.date :end_date
      t.string :competition_type
      t.string :grouped_by

      t.timestamps
    end
  end
end
