class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :state, :county, :email

  has_many :dogs

end
