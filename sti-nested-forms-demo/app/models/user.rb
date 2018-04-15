class User < ApplicationRecord
	has_many :user_social_links, dependent: :destroy
	has_many :social_links, through: :user_social_links
	accepts_nested_attributes_for :social_links

	validates_presence_of :name, :email, :type

	# models which subclass user
	def self.types
		%w(Developer Founder)
	end

	# define scope
	scope :developers, -> {where(type: 'Developer')}
	scope :founders, -> {where(type: 'Founder')}

	def social_links_attributes=(attributes)
		values = attributes.uniq do |hash|
			hash[1][:name]
		end
		# attributes = {0=>{}, 1=>{}, 2=>{}}
		# values = [[{}],[{}]]
		array = []
		values.flatten.each_with_index do |item,index|
			if index % 2 != 0
				array.push(item)
			end
		end
		self.social_links.build(array)
	end

end
