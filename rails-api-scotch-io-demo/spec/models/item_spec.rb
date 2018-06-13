require 'rails_helper'

RSpec.describe Item, type: :model do
  # associaciation and validation tests
  it { should belong_to(:todo) }
  it { should validate_presence_of(:name) }
end
