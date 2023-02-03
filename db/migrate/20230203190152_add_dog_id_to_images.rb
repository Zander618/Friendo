class AddDogIdToImages < ActiveRecord::Migration[7.0]
  def change
    add_column :images, :dog_id, :integer
  end
end
