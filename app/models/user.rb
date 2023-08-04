class User < ApplicationRecord
  has_secure_password
  has_many :dogs
  # has_many :sent_messages, class_name: "Message", foreign_key: "invitor_id", dependent: :destroy
  # has_many :recieved_messages, class_name: "Message", foreign_key: "invitee_id", dependent: :destroy
  # has_many :messages, dependent: :destroy


  validates :username, uniqueness: true
  validates :username, presence: true
  validates :first_name, presence: true
  validates :state, presence: true
  validates :county, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: {minimum: 6}, if: :password

  def send_password_reset
    self.update!(password_reset_token: self.generate_base64_token, password_reset_sent_at: Time.zone.now)
    UserMailer.with(user: self, token: self.password_reset_token).password_reset_email.deliver_now
  end

  def reset_password(params)
    self.update!(password: params[:password])      
    self.update!(password_reset_token: nil, password_reset_sent_at: nil)    
  end

  private

  def generate_base64_token
    SecureRandom.urlsafe_base64
  end
end
