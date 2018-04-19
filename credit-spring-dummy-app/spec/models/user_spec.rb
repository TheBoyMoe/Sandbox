require 'rails_helper'

RSpec.describe User, type: :model do

  it 'is invalid if user is not in whitelist table' do
    whitelist_user = Whitelist.create(email: 'a@a.com')
    user = FactoryBot.build(:user, email: whitelist_user.email)
    expect(user).to be_valid
  end

  it 'is invalid when the email address is not in the whitelist' do
    whitelist_user = Whitelist.create(email: 'a@a.com')
    user = FactoryBot.build(:user, email: 'z@z.com')
    expect(user).to be_invalid
  end


  it 'is invalid when the email address is not provided' do
    # user = User.new(email: '', password: '1234')
    user = FactoryBot.build(:user, email: '')
    expect(user).to be_invalid
  end

  it 'is invalid if the email addres is not unique' do
    # User.create(email: 'a@a.com', password: '1234')
    # user = User.new(email: 'a@a.com', password: '1234')
    FactoryBot.create(:user, email: 'a@a.com')
    user = FactoryBot.build(:user, email: 'a@a.com')
    expect(user).to be_invalid
  end
end
