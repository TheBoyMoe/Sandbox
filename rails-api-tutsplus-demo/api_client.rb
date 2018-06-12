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

# create post
client = Faraday.new(url: 'http://localhost:3000') do |config|
  config.adapter Faraday.default_adapter
  config.token_auth('token???')
end

response = client.post do |req|
  req.url '/api/v1/users'
  req.headers['Content-Type'] = 'application/json'
  req.body = '{"post": {"title": "Post title", "body": "Post content"}}'
end



puts Oj.load(response.body)
puts response.status
