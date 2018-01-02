class SessionsController < ApplicationController

	def create
		# byebug # DEBUG - determine what the auth hash returned by the provider looks like
		user = User.update_or_create(request.env["omniauth.auth"])
		session[:user_id] = user.id
		redirect_to root_path
	end

	def destroy
		session.clear
		redirect_to root_path
	end
end