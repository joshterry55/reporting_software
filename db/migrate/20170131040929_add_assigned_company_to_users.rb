class AddAssignedCompanyToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :assigned_company, :jsonb, default: [], array: true
  end
end
