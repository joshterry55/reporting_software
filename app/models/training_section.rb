class TrainingSection < ApplicationRecord
  belongs_to :training_category
  belongs_to :company
  has_many :training_videos, dependent: :destroy 
end
