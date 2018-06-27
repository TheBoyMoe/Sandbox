json.array! @images do |image|
  json.id image.id
  json.title image.title
  json.path image.path
  json.user do
    json.id image.user.id
    json.name image.user.name
  end
end