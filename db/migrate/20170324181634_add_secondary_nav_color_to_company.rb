class AddSecondaryNavColorToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :secondary_nav_color, :string, default: "#808080"
  end
end
