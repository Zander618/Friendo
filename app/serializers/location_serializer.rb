class LocationSerializer < ActiveModel::Serializer
  attributes :id, :address, :name, :photo

  has_many :meetups
end
