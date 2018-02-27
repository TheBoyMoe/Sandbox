class SocialLink < ApplicationRecord
	has_many :user_social_links
	has_many :users, through: :user_social_links

	# todo block blank
end
