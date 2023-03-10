class Dog < ApplicationRecord

  belongs_to :user 
  has_one :image
  has_many :sent_invitations, class_name: "Meetup", foreign_key: "invitor_id", dependent: :destroy
  has_many :recieved_invitations, class_name: "Meetup", foreign_key: "invitee_id", dependent: :destroy
  has_many :meetups, dependent: :destroy
 end
