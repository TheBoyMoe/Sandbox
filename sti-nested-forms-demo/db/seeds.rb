
5.times do
	User.create!(
		name: Faker::Name.name,
		email: Faker::Internet.email,
		bio: Faker::Lorem.paragraph,
		image: Faker::Avatar.image("my-own-slug", "50x50", "jpg"),
		type: 'Developer'
	)
end


5.times do
	User.create!(
		name: Faker::Name.name,
		email: Faker::Internet.email,
		bio: Faker::Lorem.paragraph,
		image: Faker::Avatar.image("my-own-slug", "50x50", "jpg"),
		type: 'Founder'
	)
end