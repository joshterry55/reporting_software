class AddSecondaryTextColorToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :secondary_text, :string, default: "#ffffff"
  end
end
