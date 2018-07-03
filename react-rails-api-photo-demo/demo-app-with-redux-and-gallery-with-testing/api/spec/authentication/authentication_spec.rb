require 'rails_helper'
require 'jwt'

RSpec.describe 'User authentication', type: :request do
  describe 'user signup' do
    let(:user) { FactoryBot.build(:user) }

    it 'creates a new user account' do
      expect {
        post '/api/v1/users', params: {
          user: {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
          }
        }
      }.to change(User, :count).by(1)

      expect(response).to have_http_status(200)
    end
  end

  describe 'user login' do
    let(:user) { FactoryBot.create(:user) }

    context 'with valid credentials' do
      before {
        post '/user_token', params: {
          auth: {
            email: user.email,
            password: user.password 
          }
        }
      }
      it 'logs in an existing user' do
        expect(response).to have_http_status(201)
      end

      it 'returns a string token' do
        obj = JSON.parse(response.body)
        expect(obj['jwt']).to be_a(String)
      end
    end
    
    context 'with invalid credentials' do
      before {
        post '/user_token', params: {
          auth: {
            email: user.email,
            password: '12345678'
          }
        }
      }
      it 'authentication fails, returns 404 status code' do
        expect(response).to have_http_status(404)
      end
    end
  end
  
end
