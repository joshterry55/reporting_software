class CreateSitdowns < ActiveRecord::Migration[5.0]
  def change
    create_table :sitdowns do |t|
      t.string :number, null: false
      t.string :date, null: false 
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
