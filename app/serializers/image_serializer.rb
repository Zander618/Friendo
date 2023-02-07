class ImageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :dog_image
  has_one :dog

  def dog_image
    rails_blob_path(object.dog_image, only_path: true) if object.dog_image.attached?  
  end
  
end
