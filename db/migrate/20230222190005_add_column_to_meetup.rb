class AddColumnToMeetup < ActiveRecord::Migration[7.0]
  def change
    add_column :meetups, :dog_id, :integer
  end
end
