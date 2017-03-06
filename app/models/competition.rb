class Competition < ApplicationRecord
  belongs_to :company
  has_many :competition_groups
  has_many :prizes
end
