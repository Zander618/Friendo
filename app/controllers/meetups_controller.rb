class MeetupsController < ApplicationController
  before_action :set_meetup, only: %i[ show update destroy ]

  # GET /meetups
  def index
    meetups = Meetup.all
    render json: meetups
  end

  # GET /meetups/1
  def show
    render json: @meetup
  end

  # POST /meetups
  def create
    meetup = Meetup.create(meetup_params)
    if meetup.valid?
      render json: meetup, status: :created
    else
      render json: {errors: meetup.errors}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meetups/1
  def update
    if @meetup.update(meetup_params)
      render json: @meetup
    else
      render json: {error: "Meetup Not Found! Dog has likely been removed"}, status: :not_found
    end
  end

  # DELETE /meetups/1
  def destroy
    @meetup.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meetup
      @meetup = Meetup.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def meetup_params
      params.require(:meetup).permit(:date, :location_id, :invitor_id, :invitee_id, :time, :response)
    end
end
