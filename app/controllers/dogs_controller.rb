class DogsController < ApplicationController
  before_action :set_dog, only: %i[ show update destroy ]

  # GET /dogs
  def index
    dogs = Dog.all
    render json: dogs
  end

  # GET /dogs/1
  def show
    render json: @dog
  end

  # POST /dogs
  def create
    dog = Dog.new(dog_params)
    if dog.valid?
      render json: dog, status: :created
    else
      render json: { errors: dog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /dogs/1
  def update
    dog = Dog.find_by(id: params[:id])
    if dog
      dog.update!(dog_params)
      render json: dog
    else
      render json: { errors: dog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /dogs/1
  def destroy
    dog = Dog.find_by(id: params[:id])
    if dog
      dog.destroy
      head :no_content
    else
      render json: {error: "no dog found"}, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dog
      @dog = Dog.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def dog_params
      params.require(:dog).permit(:user_id, :name, :breed, :traits, :enjoyed_activities, :age, :image_data, :vaccination)
    end
end
