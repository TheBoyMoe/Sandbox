class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  # before avery action, in every controller, ensure the 
  # ensure the user is authenticated - has a valid token
  before_action :authorize_request
  attr_reader :current_user

  # NOTE: skip authorization when signingup and authenticating
  # - config in Users and Authentication controllers respectively
  private
    def authorize_request
      # set current user if request s verified
      @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
    end
end
