class AddInviteeToMeetup < ActiveRecord::Migration[7.0]
  def change
    add_column :meetups, :invitee_id, :integer
  end
end
