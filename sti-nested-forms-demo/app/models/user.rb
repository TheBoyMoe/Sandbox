class User < ApplicationRecord

	# models which subclass user0
	def self.types
		%w(Developer Founder)
	end
end
