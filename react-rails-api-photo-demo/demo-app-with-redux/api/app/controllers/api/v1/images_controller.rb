module Api
  module V1
    class ImagesController < ApplicationController
      before_action :set_user, only: %i(create destroy)

      def index
        @images = Image.order('created_at DESC')
        render json: @images
      end

      def create
        @image = @user.images.new(image_params)
        if @image.save
          render json: @image, status: :created
        else
          render json: @image.errors, status: :unprocessable_entity
        end
      end

      def show
        @image = Image.find(params[:id])
        render json: @image
      end

      def destroy
        @image = @user.images.find(params[:id])
        if @image
          @image.destroy
        else
          render json: { image: 'not found'}, status: :not_found
        end
      end

      private

      def image_params
        params.require(:image).permit(:title, :path, :photo)
      end

      def set_user
        @user = User.find(1)
      end
    end
  end
end