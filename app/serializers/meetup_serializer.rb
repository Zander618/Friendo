class MeetupSerializer < ActiveModel::Serializer
  attributes :id, :date, :location_id, :invitor, :invitee, :location_name, :location_address, :time, :response, :invitor_username, :invitor_email, :invitee_email, :invitee_username

  def location_name
    object.location.name
  end

  def location_address
    object.location.address
  end

  def invitor_username
    object.invitor.user.username
  end

  def invitor_email
    object.invitor.user.email
  end

  def invitee_username
    object.invitee.user.username
  end

  def invitee_email
    object.invitee.user.email
  end

  belongs_to :invitee, class_name: "Dog", foreign_key: "invitee_id"
  belongs_to :invitor, class_name: "Dog", foreign_key: "invitor_id"
  belongs_to :location

end
