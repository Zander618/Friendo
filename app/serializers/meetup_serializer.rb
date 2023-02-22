class MeetupSerializer < ActiveModel::Serializer
  attributes :id, :date, :location_id

  belongs_to :invitee, class_name: "Dog", foreign_key: "invitee_id"
  belongs_to :invitor, class_name: "Dog", foreign_key: "invitor_id"
  belongs_to :location

end
