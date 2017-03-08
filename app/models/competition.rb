class Competition < ApplicationRecord
  belongs_to :company
  has_many :competition_groups, dependent: :destroy
  has_many :prizes, dependent: :destroy
end
