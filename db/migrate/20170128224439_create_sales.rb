class CreateSales < ActiveRecord::Migration[5.0]
  def change
    create_table :sales do |t|
      t.string :first_name
      t.string :last_name
      t.string :kw
      t.integer :sit_down
      t.integer :site_survey
      t.integer :close
      t.integer :cancel
      t.string :date
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
