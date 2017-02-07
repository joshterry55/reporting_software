class AddCompanyToOffice < ActiveRecord::Migration[5.0]
  def change
    add_reference :offices, :company, foreign_key: true
  end
end
