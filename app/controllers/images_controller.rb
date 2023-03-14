class ImagesController < ApplicationController

  def index
    render json: Image.all
  end

  def create
    image = Image.create(image_params)
    render json: image, status: :created
  end

  def update
    image = Image.find_by(id: params[:id])
    if image
      image.update(image_params)
      render json: image
    else
      render json: {error: "Image Not Found"}, status: :not_found
    end
  end

  private

  def image_params
    params.permit(:dog_image, :dog_id)
  end
end
