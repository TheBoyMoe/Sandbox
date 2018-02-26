class UsersController < ApplicationController
	before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :set_type

  def index
    @users = type_class.all # filter model based on type parameter
  end

  def show
  end

  def new
		@user = type_class.new
  end

  def create
		@user = User.new(user_params)
		if @user.save
			redirect_to @user, notice: "#{check_type} was successfully created"
		else
			render action: 'new'
		end
  end

  def edit
  end

  def update
		if @user.update(user_params)
			redirect_to @user, notice: "#{check_type} was successfully updated"
		else
			render action: 'edit'
		end
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

		def set_user
			@user = type_class.find(params[:id])
		end

		def user_params
			params.require(check_type.underscore.to_sym).permit(:name, :email, :bio, :image, :type)
		end
end
