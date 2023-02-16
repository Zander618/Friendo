class ChangeDateInMeetups < ActiveRecord::Migration[7.0]
  def change
    change_column :meetups, :date, :string
  end
end
