class Sale < ApplicationRecord
  belongs_to :user
  belongs_to :office
  belongs_to :region
  validates_presence_of :first_name, :last_name
end
