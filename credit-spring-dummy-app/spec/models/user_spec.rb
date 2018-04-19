require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is invalid when the email address is not in the whitelist' do
    user = User.new(email: 'z@z.com', password: '1234')
    expect(user).to be_invalid
  end

  it 'is valid when the email address is in the whitelist' do
    user = User.new(email: 'a@a.com', password: '1234')
    expect(user).to be_valid
  end

  it 'is invalid when the email address is not provided' do
    user = User.new(email: '', password: '1234')
    expect(user).to be_invalid
  end

  it 'is invalid if the email addres is not unique' do
    User.create(email: 'a@a.com', password: '1234')
    user = User.new(email: 'a@a.com', password: '1234')
    expect(user).to be_invalid
  end
end
