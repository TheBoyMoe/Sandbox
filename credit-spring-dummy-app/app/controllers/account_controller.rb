class AccountController < ApplicationController
  before_action :require_login

  def index; end

  def destroy
    cookies.clear
    redirect_to root_path
  end
end
