class User < ApplicationRecord
  has_secure_password
  has_many :dogs


  validates :username, uniqueness: true
  validates :username, presence: true
  validates :first_name, presence: true
  validates :state, presence: true
  validates :county, presence: true
  validates :email, presence: true
end
