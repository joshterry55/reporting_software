class ChangeDataTypeForEndDate < ActiveRecord::Migration[5.0]
  def change
    change_column :competitions, :end_date, 'timestamp USING CAST(end_date AS timestamp)'
  end
end
