class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # call application concerns
  include DeviseWhitelist

  #  override the devise current_user method
  def current_user
    # if no user is logged in return the guest user
    super || OpenStruct.new(name: 'Guest User', first_name: 'Guest', last_name: 'User', email: 'guest@example.com')
  end
end
