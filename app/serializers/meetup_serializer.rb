class MeetupSerializer < ActiveModel::Serializer
  attributes :id, :data

  has_many :dog_meetups
  has_many :dogs, through: :dog_meetups
  belongs_to :location

end
