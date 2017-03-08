class AddAvatarToRegion < ActiveRecord::Migration[5.0]
  def change
    add_column :regions, :avatar, :string, default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1488493338/anon3_ozafcv.jpg"
  end
end
