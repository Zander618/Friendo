class AddTimeToMeetup < ActiveRecord::Migration[7.0]
  def change
    add_column :meetups, :time, :time
  end
end
