class AddTruePercentageToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :true_percentage, :string, default: "30"
  end
end
