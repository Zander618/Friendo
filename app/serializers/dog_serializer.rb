class DogSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :user_id, :name, :breed, :traits, :enjoyed_activities, :age, :vaccination, :image, :uploaded_image, :owner_username, :meetups
  
  def uploaded_image
    if object.image
      rails_blob_path(object.image.dog_image, only_path: true)
    else
      false
    end
  end

  def owner_username
    object.user.username
  end

  belongs_to :user 
  has_one :image
  has_many :sent_invitations, class_name: "Meetup", foreign_key: "invitor_id"
  has_many :recieved_invitations, class_name: "Meetup", foreign_key: "invitee_id"
  has_many :meetups
end
