class MeetupSerializer < ActiveModel::Serializer
  attributes :id, :date, :location_id, :invitor, :invitee, :location_name, :location_address, :time, :response

  def location_name
    object.location.name
  end

  def location_address
    object.location.address
  end

  belongs_to :invitee, class_name: "Dog", foreign_key: "invitee_id"
  belongs_to :invitor, class_name: "Dog", foreign_key: "invitor_id"
  belongs_to :location

end
