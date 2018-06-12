module Api
  module V1
    class PostsController < ApplicationController
      include ActionController::HttpAuthentication::Token::ControllerMethods
      before_action :authenticate, only: [:create, :destroy]

      def index
        @posts = Post.order('created_at DESC')
        render json: @posts
      end

      private
        def authenticate
          authenticate_or_request_with_http_token do |token, options|
            @user = User.find_by(token: token)
          end
        end
    end
  end
end
