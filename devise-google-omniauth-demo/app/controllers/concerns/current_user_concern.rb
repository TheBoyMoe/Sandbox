module CurrentUserConcern
	extend ActiveSupport::Concern

	#  override the devise current_user method
	def current_user
		# if no user is logged in return the guest user
		super || guest_user
	end

	private
		def guest_user
			OpenStruct.new(
					name: 'Guest User',
					first_name: 'Guest',
					last_name: 'User',
					email: 'guest@example.com'
			)
		end
end