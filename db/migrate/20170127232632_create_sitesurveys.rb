class CreateSitesurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :sitesurveys do |t|
      t.string :number, null: false
      t.string :date, null: false 
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
