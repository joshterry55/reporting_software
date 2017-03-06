class CreatePrizes < ActiveRecord::Migration[5.0]
  def change
    create_table :prizes do |t|
      t.belongs_to :competition, foreign_key: true
      t.string :name
      t.string :avatar
      t.string :rank

      t.timestamps
    end
  end
end
