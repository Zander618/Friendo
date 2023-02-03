class DogSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :breed, :traits, :enjoyed_activities, :age, :vaccination

  belongs_to :user 
  has_one :image
  # has_many :meetups, through: :dog_meetups
end
