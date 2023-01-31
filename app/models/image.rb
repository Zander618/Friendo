class Image < ApplicationRecord
  belongs_to :user
  has_one_attached :dog_image
end
