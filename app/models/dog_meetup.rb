class DogMeetup < ApplicationRecord
  belongs_to :invitor, class_name: 'Dog'
  belongs_to :invitee, class_name: 'Dog'
  belongs_to :meetup
end
