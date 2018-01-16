# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(
		name: 'User',
		email: 'user@example.com',
		password: 'password',
		password_confirmation: 'password',
		roles: 'editor'
)

User.create!(
		name: 'Admin',
		email: 'admin@example.com',
		password: 'password',
		password_confirmation: 'password',
		roles: 'admin'
)


# blog posts
10.times do  |i|
	Blog.create!(
			title: "Blog title #{i + 1}",
			content: 'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps.',
			user_id: 1
	)
end