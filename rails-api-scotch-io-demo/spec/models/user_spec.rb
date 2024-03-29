require 'rails_helper'

RSpec.describe User, type: :model do
  # test association and validations
  it { should have_many(:todos) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
end
