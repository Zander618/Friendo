class MeetupSerializer < ActiveModel::Serializer
  attributes :id, :date, :location_id, :invitor_id, :invitee_id

  belongs_to :invitee, class_name: 'Dog'
  belongs_to :invitor, class_name: 'Dog'
  belongs_to :location

end
