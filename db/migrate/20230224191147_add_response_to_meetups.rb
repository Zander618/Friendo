class AddResponseToMeetups < ActiveRecord::Migration[7.0]
  def change
    add_column :meetups, :response, :integer
  end
end
