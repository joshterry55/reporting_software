class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :phone_number
      t.string :role, null: false, default: 'Employee'
      t.belongs_to :company, foreign_key: true
      t.belongs_to :region, foreign_key: true
      t.belongs_to :office, foreign_key: true

      t.timestamps
    end
  end
end
