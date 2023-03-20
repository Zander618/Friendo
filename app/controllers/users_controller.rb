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


  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :first_name, :state, :county, :email)
  end

end
