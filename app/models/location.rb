class Location < ApplicationRecord
  has_many  :meetups

  validates :address, presence: true
  validates :name, presence: true

end
