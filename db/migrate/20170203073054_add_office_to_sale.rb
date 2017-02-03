class AddOfficeToSale < ActiveRecord::Migration[5.0]
  def change
    add_reference :sales, :office, foreign_key: true
  end
end
