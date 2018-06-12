require 'faraday'
require 'oj'

# create user
client = Faraday.new(url: 'http://localhost:3000') do |config|
  config.adapter Faraday.default_adapter
end

response = client.post do |req|
  req.url '/api/v1/users'
  req.headers['Content-Type'] = 'application/json'
  req.body = '{"user": {"name": "test user"}}'
end

# create post - use a token of the above user from the database
client = Faraday.new(url: 'http://localhost:3000') do |config|
  config.adapter Faraday.default_adapter
  config.token_auth('5cc7187171ec5deaab649abfd9dd9e63')
end

response = client.post do |req|
  req.url '/api/v1/users'
  req.headers['Content-Type'] = 'application/json'
  req.body = '{"post": {"title": "Post title", "body": "Post content"}}'
end

# delete post
response = client.post do |req|
  req.url '/api/v1/posts/6'
  req.headers['Content-Type'] = 'application/json'
end


puts Oj.load(response.body)
puts response.status
