class ImagesController < ApplicationController

  def index
    render json: Image.all
  end

  def create
    image = Image.create(image_params)
    render json: image, status: :created
  end


  def purge
    dog = Dog.find_by(id: params[:id])
    if dog
      dog.image.destroy
      head :no_content
    else
      render json: {error: "Image Not Found"}, status: :not_found
    end
  end

  private

  def image_params
    params.permit(:dog_image, :dog_id)
  end
end
