class DogSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :user_id, :name, :breed, :traits, :enjoyed_activities, :age, :vaccination, :dog_image

  belongs_to :user 
  has_one :image
  # has_many :meetups, through: :dog_meetups

  def dog_image
    rails_blob_path(object.image.dog_image, only_path: true) if object.image.dog_image.attached?  
  end

end
