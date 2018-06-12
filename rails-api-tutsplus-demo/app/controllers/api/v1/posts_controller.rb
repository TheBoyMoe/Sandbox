module Api
  module V1
    class PostsController < ApplicationController
      include ActionController::HttpAuthentication::Token::ControllerMethods
      before_action :authenticate, only: [:create, :destroy]

      def index
        @posts = Post.order('created_at DESC')
        render json: @posts
      end

      def create
        @post = @user.posts.new(post_params)
        if @post.save
          render json: @post, status: :created
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      private
        def post_params
          params.require(:post).permit(:title, :body)
        end

        def authenticate
          # token needs to be provided by the client with each create/delete request
          # also sets the @user object
          authenticate_or_request_with_http_token do |token, options|
            @user = User.find_by(token: token)
          end
        end
    end
  end
end
