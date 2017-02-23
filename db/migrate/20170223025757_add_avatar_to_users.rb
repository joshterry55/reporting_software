class AddAvatarToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :avatar, :string, default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1483585049/anonBee_wgbcih.jpg"
  end
end
