class ChangeTimeInMeetups < ActiveRecord::Migration[7.0]
  def change
    change_column :meetups, :time, :string
  end
end
