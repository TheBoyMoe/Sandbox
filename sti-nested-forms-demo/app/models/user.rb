class User < ApplicationRecord

	# models which subclass user
	def self.types
		%w(Developer Founder)
	end

	# define scope
	scope :developers, -> {where(type: 'Developer')}
	scope :founders, -> {where(type: 'Founder')}
end
