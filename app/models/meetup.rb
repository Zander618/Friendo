class Meetup < ApplicationRecord
  belongs_to :invitee, class_name: 'Dog'
  belongs_to :invitor, class_name: 'Dog'
  belongs_to :location
end
