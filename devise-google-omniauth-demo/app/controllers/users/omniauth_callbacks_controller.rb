class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	# google callback
	def google
		callback_from(:google)
	end

	# github callback
	def github
		callback_from(:github)
	end

	def failure
		flash[:error] = "There was a problem signing in"
		redirect_to root_path
	end


	private
		def callback_from(provider)
			@user = User.from_omniauth(request.env['omniauth.auth'])
			if @user.persisted?
				sign_in_and_redirect @user
				set_flash_message(:notice, :success, kind: provider.capitalize) if is_navigational_format?
			else
				session["devise.#{provider}_data"] = request.env["omniauth.auth"]
				flash[:error] = "There was a problem signing you in through #{provider}."
				redirect_to new_user_registration_url
			end
		end
end