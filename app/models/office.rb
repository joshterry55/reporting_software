class Office < ApplicationRecord
  belongs_to :region
  has_many :users, dependent: :destroy
  has_many :announcements, dependent: :destroy
  has_many :sales, dependent: :destroy
  validates_presence_of :name
end
