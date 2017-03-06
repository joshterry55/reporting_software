class Company < ApplicationRecord
  has_many :regions
  has_many :users
  has_many :offices
  has_many :sales
  has_many :training_categories, dependent: :destroy
  has_many :training_sections, dependent: :destroy
  has_many :training_videos, dependent: :destroy
  has_many :competitions 
  validates_presence_of :name

end
