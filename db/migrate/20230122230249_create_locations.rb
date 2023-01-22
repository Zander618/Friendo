class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.string :address
      t.string :name
      t.string :photo
      t.boolean :is_a_dog_park

      t.timestamps
    end
  end
end
