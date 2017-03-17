class AddLifetimeKwToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :lifetime_kw, :string, default: "1000"
  end
end
