class CreateCompetitionGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :competition_groups do |t|
      t.belongs_to :competition, foreign_key: true
      t.string :avatar
      t.string :name

      t.timestamps
    end
  end
end
