class Image < ApplicationRecord
  belongs_to :dog
  has_one_attached :dog_image
end
