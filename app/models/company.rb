class Company < ApplicationRecord
  has_many :regions
  has_many :users
  has_many :offices
  validates_presence_of :name

end
