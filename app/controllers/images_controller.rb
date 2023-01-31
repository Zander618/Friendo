class ImagesController < ApplicationController

  def index
    render json: Image.all
  end

  def create
    image = Image.create(image_params)
    render json: image, status: :created
  end

  private

  def image_params
    params.permit(:dog_image, :dog_id)
  end
end
