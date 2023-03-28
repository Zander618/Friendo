class Message < ApplicationRecord
  belongs_to :invitee, class_name: "User", foreign_key: "invitee_id"
  belongs_to :invitor, class_name: "User", foreign_key: "invitor_id"
  belongs_to :location
end
