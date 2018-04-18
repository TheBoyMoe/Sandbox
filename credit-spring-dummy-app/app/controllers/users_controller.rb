class UsersController < Clearance::UsersController
  # before_action :whitelisted_users, only: [:create] # otherwise you can't load form

  def create
    @user = User.new(user_details)

    if @user.valid?
      @user.save
      sign_in @user
      redirect_back_or url_after_create
    else
      render 'new'
    end
  end

  private

  def user_details
    params.require(:user).permit(:email, :password)
  end
end
