class Company < ApplicationRecord
  has_many :regions
  has_many :users
  has_many :offices
  has_many :sales
  has_many :training_categories
  has_many :training_sections
  validates_presence_of :name

end
