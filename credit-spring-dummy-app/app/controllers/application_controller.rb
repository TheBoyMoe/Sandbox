class ApplicationController < ActionController::Base
  include Clearance::Controller
  protect_from_forgery with: :exception

  def sign_out
    session.delete :userinfo

    redirect_to root_path
  end

  private

  def require_signed_in_user
    return if ENV['AUTH0_SKIP_DEVELOPMENT_ADMIN_LOGIN'] == 'true' && !Rails.env.production?

    redirect_to sign_in_path unless session[:userinfo].present?
  end
end
