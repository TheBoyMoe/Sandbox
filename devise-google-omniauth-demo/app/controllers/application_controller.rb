class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # devise whitelist - define what user parameters are accepted
  before_action :permitted_devise_parameters, if: :devise_controller?

  private
    def permitted_devise_parameters
      # additional parameters, email and password are accepted by default
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name]) # edit
    end
end
