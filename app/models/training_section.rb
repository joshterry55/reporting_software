class TrainingSection < ApplicationRecord
  belongs_to :training_category
  belongs_to :company
end
