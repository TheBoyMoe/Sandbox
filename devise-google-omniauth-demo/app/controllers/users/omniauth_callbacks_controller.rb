class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	# google callback
	def google
		@user = User.from_omniauth(request.env["omniauth.auth"])
		if @user.persisted?
			sign_in_and_redirect @user #this will throw if @user is not activated
			set_flash_message(:notice, :success, kind: "Google") if is_navigational_format?
		else
			session["devise.google_data"] = request.env["omniauth.auth"]
			flash[:error] = "There was a problem signing you in through Google."
			redirect_to new_user_registration_url
		end
	end

	# github callback
	def github
		@user = User.from_omniauth(request.env['omniauth.auth'])
		if @user.persisted?
			sign_in_and_redirect @user
			set_flash_message(:notice, :success, kind: 'Github') if is_navigational_format?
		else
			session["devise.github_data"] = request.env["omniauth.auth"]
			flash[:error] = 'There was a problem signing you in through Github.'
			redirect_to new_user_registration_url
		end

	end

	def failure
		flash[:error] = "There was a problem signing in"
		redirect_to root_path
	end
end