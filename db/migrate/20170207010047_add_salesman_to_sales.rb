class AddSalesmanToSales < ActiveRecord::Migration[5.0]
  def change
    add_column :sales, :salesman, :string
  end
end
