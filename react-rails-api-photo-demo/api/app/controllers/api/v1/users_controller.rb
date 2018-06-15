module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user, only: %i(index current update)
      before_action :authorize_as_admin, only: :destroy
      before_action :authorize, only: :update
      before_action :set_user, only: %i(update destroy)

      def index
        render json: { status: 200, msg: 'Logged in' }
      end

      def create
        @user = User.new(user_params)
        if @user.save
          render json: { status: 200, msg: 'User was created.' }
        end
      end

      def update
        if @user.update(user_params)
          render json: { status: 200, msg: 'User details have been updated.' }
        end
      end

      def destroy
        if @user.destroy
          render json: { status: 200, msg: 'User has been deleted.' }
        end
      end

      def current
        current_user.update!(last_login: Time.now)
        render json: current_user
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
      end

      def set_user
        @user = User.find(params[:id])
      end

      def authorize
        return_unauthorized unless current_user && current_user.can_modify_user?(params[:id])
      end
    end
  end
end
