class AddCountyToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :county, :string
  end
end
