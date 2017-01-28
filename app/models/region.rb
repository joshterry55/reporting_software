class Region < ApplicationRecord
  belongs_to :company
  has_many :users
  has_many :offices
  validates_presence_of :name
end
