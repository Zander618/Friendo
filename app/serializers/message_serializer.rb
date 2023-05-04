class MessageSerializer < ActiveModel::Serializer
  attributes :id, :invitor_id, :invitee_id, :meetup_id, :text, :date, :time
end
