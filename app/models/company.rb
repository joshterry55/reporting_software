class Company < ApplicationRecord
  has_many :regions
  has_many :users
  validates_presence_of :name
  
end
