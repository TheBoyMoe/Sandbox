module CurrentUserConcern
	extend ActiveSupport::Concern

	#  override the devise current_user method
	def current_user
		# if no user is logged in return the guest user
		super || guest_user

	end

	private
		def guest_user
			# OpenStruct.new(
			# 			name: 'Guest User',
			# 			first_name: 'Guest',
			# 			last_name: 'User',
			# 			email: 'guest@example.com'
			# 	)

			# because petergate gem access the user model, refactor guest_user
			# to inherit from User model
			guest = GuestUser.new
			guest.name = "Guest User"
			guest.first_name = "Guest"
			guest.last_name = "User"
			guest.email = "guest@example.com"
			guest
		end
end