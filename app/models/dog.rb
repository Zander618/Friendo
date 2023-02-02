class Dog < ApplicationRecord

  belongs_to :user 
  has_one :image
  # has_many :dog_meetup_sent_invitations, class_name: “DogMeetup”, foreign_key: “invitor_id” 
  # has_many :dog_meetup_recieved_invitations, class_name: “DogMeetup”, foreign_key: “invitee_id”
  has_many :meetups, through: :dog_meetups
 end
