class Dog < ApplicationRecord

  belongs_to :user 
  has_one :image
  has_many :sent_invitations, class_name: "Meetup", foreign_key: "invitor_id"
  has_many :recieved_invitations, class_name: "Meetup", foreign_key: "invitee_id"
  has_many :meetups
 end
