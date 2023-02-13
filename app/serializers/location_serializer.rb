class LocationSerializer < ActiveModel::Serializer
  attributes :id, :address, :name, :photo
end
