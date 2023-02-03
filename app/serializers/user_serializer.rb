class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :state, :country, :email

  has_many :dogs

  # def dog_image
  #   byebug
  # end

end
