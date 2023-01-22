class CreateMeetups < ActiveRecord::Migration[7.0]
  def change
    create_table :meetups do |t|
      t.integer :location_id
      t.datetime :date

      t.timestamps
    end
  end
end
