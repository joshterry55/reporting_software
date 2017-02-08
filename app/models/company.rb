class Company < ApplicationRecord
  has_many :regions
  has_many :users
  has_many :offices
  has_many :sales
  validates_presence_of :name

end
