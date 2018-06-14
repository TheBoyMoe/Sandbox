5.times do
  user = User.create({ name: Faker::Name.name })
  5.times do
    user.images.create({ title: Faker::Book.title, path: Faker::Avatar.image}) 
  end
end