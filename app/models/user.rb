class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :company, optional: true
  belongs_to :region, optional: true
  belongs_to :office, optional: true
  has_many :sales, dependent: :destroy
  validates_presence_of :first_name, :last_name, :role
  validates_inclusion_of :role, in: %w(Admin Employee)

end
