class ChangeDataTypeForStartDate < ActiveRecord::Migration[5.0]
  def change
    change_column :competitions, :start_date, 'timestamp USING CAST(start_date AS timestamp)'
  end
end
