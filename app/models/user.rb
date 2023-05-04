class User < ApplicationRecord
  has_secure_password
  has_many :dogs
  # has_many :sent_messages, class_name: "Message", foreign_key: "invitor_id", dependent: :destroy
  # has_many :recieved_messages, class_name: "Message", foreign_key: "invitee_id", dependent: :destroy
  # has_many :messages, dependent: :destroy


  validates :username, uniqueness: true
  validates :username, presence: true
  validates :first_name, presence: true
  validates :state, presence: true
  validates :county, presence: true
  validates :email, presence: true
end
