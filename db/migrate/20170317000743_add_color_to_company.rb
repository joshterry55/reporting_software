class AddColorToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :color, :string, default: "#354458"
  end
end
