require 'rails_helper'

RSpec.describe "Posts API" do
  let(:author) { FactorBot.create(:author) }
  let(:post) { FactoryBot.create(:post) }

  before { author.generate_api_key }

  context 'as an authenticated user' do

  end
end
