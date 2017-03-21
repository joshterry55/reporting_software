class AddColorTextToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :color_text, :string, default: "#ffffff"
  end
end
