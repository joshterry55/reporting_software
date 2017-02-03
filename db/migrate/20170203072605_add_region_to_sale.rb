class AddRegionToSale < ActiveRecord::Migration[5.0]
  def change
    add_reference :sales, :region, foreign_key: true
  end
end
