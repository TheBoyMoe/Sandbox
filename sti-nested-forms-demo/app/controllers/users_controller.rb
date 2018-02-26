class UsersController < ApplicationController
  before_action :set_type

  def index
    @users = type_class.all # filter model based on type parameter
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
    # make the type value available in the view
    def set_type
      @type = check_type
    end

    # check if the params hash includes the type
    def check_type
      User.types.include?(params[:type])? params[:type] : 'User'
    end

    def type_class
      check_type.constantize
    end
end
