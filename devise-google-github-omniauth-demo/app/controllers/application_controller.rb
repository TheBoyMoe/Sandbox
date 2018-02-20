class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # call application concerns
  include DeviseWhitelist
  # include CurrentUserConcern # implements custom current_user
end
