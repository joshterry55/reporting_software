class Region < ApplicationRecord
  belongs_to :company
  has_many :users, dependent: :destroy
  has_many :offices, dependent: :destroy
  validates_presence_of :name
end
