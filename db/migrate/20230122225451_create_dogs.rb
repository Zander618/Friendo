class CreateDogs < ActiveRecord::Migration[7.0]
  def change
    create_table :dogs do |t|
      t.integer :user_id
      t.string :name
      t.string :breed
      t.string :traits
      t.string :enjoyed_activities
      t.integer :age
      t.text :image_data
      t.boolean :vaccination

      t.timestamps
    end
  end
end
