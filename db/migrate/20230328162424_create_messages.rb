class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.integer :invitor_id
      t.integer :invitee_id
      t.integer :meetup_id
      t.string :text
      t.string :date
      t.string :time

      t.timestamps
    end
  end
end
