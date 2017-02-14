class TrainingCategory < ApplicationRecord
  belongs_to :company
  has_many :training_sections 
end
