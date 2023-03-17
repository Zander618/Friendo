class Dog < ApplicationRecord

  belongs_to :user 
  has_one :image
  has_many :sent_invitations, class_name: "Meetup", foreign_key: "invitor_id", dependent: :destroy
  has_many :recieved_invitations, class_name: "Meetup", foreign_key: "invitee_id", dependent: :destroy
  has_many :meetups, dependent: :destroy

  validates :name, presence: true
  validates :breed, presence: true
  validates :traits, presence: true
  validates :enjoyed_activities, presence: true
  validates :age, presence: true
  validates :vaccination, presence: true

 end
