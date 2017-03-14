class AddCancelPercentageToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :cancel_percentage, :string, default: "35"
  end
end
