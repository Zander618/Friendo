class Meetup < ApplicationRecord
  belongs_to :invitee, class_name: "Dog", foreign_key: "invitee_id"
  belongs_to :invitor, class_name: "Dog", foreign_key: "invitor_id"
  belongs_to :location

  # def accept_invitation
  #   if self.update(response: 1)
  #     ChatChannel.broadcast_to(invitor.user, { type: 'invitation_accepted', meetup_id: self.id })
  #     ChatChannel.broadcast_to(invitee.user, { type: 'invitation_accepted', meetup_id: self.id })
  #   end
  # end

  validates :time, presence: true
  validates :date, presence: true
end
