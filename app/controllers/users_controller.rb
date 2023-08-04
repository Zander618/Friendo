class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :index]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    user = User.find_by(id: params[:id])
    if user
      user.update!(user_params)
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: @current_user
  end

  def forgot
    user = User.find_by(email: params[:email])
    if user
      user.send_password_reset
      render json: { alerts: ["We have sent you an email to your registered email address, please follow the instruction to reset your password." ] }, status: :created
    else
      render json: { errors: ["Email address not registered"] }, status: :not_found
    end
  end

  def reset
    user = User.find_by(email: params[:email])
    if user
      if user.password_reset_sent_at && user.password_reset_sent_at + 3600 >= Time.zone.now && user.password_reset_token == params[:token]
        user.reset_password(params)
        session[:user_id] = user.id
        render json: {user: user, alerts: ["Your password has been reset."] }, status: :created
      else
        render json: { errors: ["Token has expired."] }, status: :unprocessable_entity
      end
    else
      render json: { errors: ["Email address not registered."] }, status: :not_found
    end
  end


  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :first_name, :state, :county, :email)
  end

end
