class CreateTrainingSections < ActiveRecord::Migration[5.0]
  def change
    create_table :training_sections do |t|
      t.string :name
      t.string :avatar, default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1483585049/anonBee_wgbcih.jpg"
      t.belongs_to :training_category, foreign_key: true

      t.timestamps
    end
  end
end
