class AddInvitorToMeetup < ActiveRecord::Migration[7.0]
  def change
    add_column :meetups, :invitor_id, :integer
  end
end
