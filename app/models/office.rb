class Office < ApplicationRecord
  belongs_to :region
  has_many :users
  has_many :announcements
  validates_presence_of :name 
end
