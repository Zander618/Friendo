class CreateDogMeetups < ActiveRecord::Migration[7.0]
  def change
    create_table :dog_meetups do |t|
      t.integer :meetup_id
      t.integer :invitee_id
      t.integer :invitor_id

      t.timestamps
    end
  end
end
