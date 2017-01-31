class AddAssignedRegionsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :assigned_regions, :jsonb, default: [], array: true
  end
end
