class CreateOffices < ActiveRecord::Migration[5.0]
  def change
    create_table :offices do |t|
      t.string :name, null: false 
      t.belongs_to :region, foreign_key: true

      t.timestamps
    end
  end
end
