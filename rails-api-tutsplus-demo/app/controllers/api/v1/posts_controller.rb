module Api
  module V1
    class PostsController < ApplicationController
      def index
        @posts = Post.order('created_at DESC')
        render json: @posts
      end
    end
  end
end
