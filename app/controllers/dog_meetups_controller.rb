class DogMeetupsController < ApplicationController
  
  def index
    dog_meetups = DogMeetup.all
    render json: dog_meetups
  end

  def show
    dog_meetups = DogMeetup.find_by(id: params[:id])
    if dog_meetups
      render json: dog_meetups
    else
      render json: { error: "Dog Meetup not found"}, status: :not_found
    end
  end

  def create
    dog_meetups = DogMeetup.create(dog_meetup_params)
    if @current_user
    render json: dog_meetups, status: :created
    else
      render json: { error: "Unable to create" }, status: :unprocessable_entity
    end
  end

  def update
    dog_meetups = DogMeetup.find_by(id: params[:id])
    if dog_meetups.user_id == @current_user.id
      dog_meetups.update(dog_meetup_params)
      render json: dog_meetups
    else
      render json: {error: "Dog Meetup Not Found"}, status: :not_found
    end
  end


  def destroy
    dog_meetup = DogMeetup.find_by(id: params[:id])
    if dog_meetup.user_id == @current_user.id
      dog_meetup.destroy
      head:no_content
    end
  end

  private

  def dog_meetup_params
    params.permit(:meetup_id, :invitee_id, :invitor_id)
  end

end
