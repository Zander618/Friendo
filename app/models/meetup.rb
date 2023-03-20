class Meetup < ApplicationRecord
  belongs_to :invitee, class_name: "Dog", foreign_key: "invitee_id"
  belongs_to :invitor, class_name: "Dog", foreign_key: "invitor_id"
  belongs_to :location

  validates :time, presence: true
  validates :date, presence: true
end
