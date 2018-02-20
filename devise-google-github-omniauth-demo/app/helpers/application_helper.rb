module ApplicationHelper

	def login_helper
		if logged_in?(:editor, :admin)
		 (link_to "Logout", destroy_user_session_path, method: :delete)
		else
			(link_to "Register", new_user_registration_path) + " | " +
			(link_to "Login", new_user_session_path)
		end
	end
end
