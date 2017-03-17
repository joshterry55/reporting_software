class AddAccentColorToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :accent_color, :string, default: "#60b9e8"
  end
end
