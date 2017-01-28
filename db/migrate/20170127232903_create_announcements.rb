class CreateAnnouncements < ActiveRecord::Migration[5.0]
  def change
    create_table :announcements do |t|
      t.string :title, null: false
      t.string :body
      t.string :date
      t.belongs_to :office, foreign_key: true

      t.timestamps
    end
  end
end
