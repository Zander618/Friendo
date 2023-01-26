class Dog < ApplicationRecord
  include ImageUploader::Attachment(:image)
  validates :title, presence: true

  belongs_to :user 
  has_many :dog_meetup_sent_invitations, class_name: “dog_meetups”, foreign_key: “invitor_id” 
  has_many :dog_meetup_recieved_invitations, class_name: “dog_meetups”, foreign_key: “invitee_id”
  has_many :meetups, through: :dog_meetups
 end
