class AddAssignedOfficesToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :assigned_offices, :jsonb, default: [], array: true
  end
end
