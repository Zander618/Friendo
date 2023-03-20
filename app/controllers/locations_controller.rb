class LocationsController < ApplicationController

  # GET /locations
  def index
    @locations = Location.all

    render json: @locations
  end

  # GET /locations/1
  # def show
  #   location = Location.find_by(id: params[:id])
  #   if location
  #     render json: location
  #   else
  #     render json: { error:"Location not found"}, status: :not_found
  #   end
  # end

  # POST /locations
  def create
    location = Location.new(location_params)
    if location.valid?
      render json: location, status: :created
    else
      render json: { errors: location.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /locations/1
  def update
    location = Location.find_by(id: params[:id])
    if location
      location.update!(location_params)
      render json: location
    else
      render json: { errors: location.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /locations/1
  # def destroy
  #   @location.destroy
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def location_params
      params.require(:location).permit(:address, :name, :photo)
    end
end
