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
end
