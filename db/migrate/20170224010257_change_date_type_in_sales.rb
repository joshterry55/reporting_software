class ChangeDateTypeInSales < ActiveRecord::Migration[5.0]
  def change
    change_column :sales, :date, 'date USING CAST(date AS date)'
  end
end
