class DogSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :user_id, :name, :breed, :traits, :enjoyed_activities, :age, :vaccination, :image, :uploaded_image
  
  def uploaded_image
    if object.image
      rails_blob_path(object.image.dog_image, only_path: true)
    else
      false
    end
  end


  belongs_to :user 
  has_one :image
  # has_many :meetups, through: :dog_meetups
end
