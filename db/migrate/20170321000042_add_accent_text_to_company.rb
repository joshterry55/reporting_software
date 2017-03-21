class AddAccentTextToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :accent_text, :string, default: "#ffffff"
  end
end
