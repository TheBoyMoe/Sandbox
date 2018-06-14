module Api
  module V1
    class ImagesController < ApplicationController
      def index
        @images = Image.order('created_at DESC')
        render json: @images
      end
    end
  end
end