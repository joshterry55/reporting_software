class ChangeColumn < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :avatar, :string, default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1488493338/anon3_ozafcv.jpg"
  end
end
