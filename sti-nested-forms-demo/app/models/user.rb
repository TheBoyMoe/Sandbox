class User < ApplicationRecord
	has_many :user_social_links
	has_many :social_links, through: :user_social_links

	# models which subclass user
	def self.types
		%w(Developer Founder)
	end

	# define scope
	scope :developers, -> {where(type: 'Developer')}
	scope :founders, -> {where(type: 'Founder')}
end
