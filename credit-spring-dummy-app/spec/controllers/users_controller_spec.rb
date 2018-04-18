require 'rails_helper'

RSpec.describe UsersController, type: :request do
  describe '#create' do
    let(:params) { { email: 'a@a.com', password: '1234' } }

    def do_request
      post users_path, params: { user: params }
    end

    it 'creates a user' do
      expect { do_request }.to change(User, :count).by(1)
    end

    it 'renders the account page' do
      do_request

      expect(response).to redirect_to account_path
    end

    context 'with invalid details' do
      let(:params) { { email: '', password: '' } }

      it 'does not create any user' do
        expect { do_request }.to change(User, :count).by(0)
      end

      it 'renders the form' do
        do_request

        expect(response.body).to have_button('Sign up now!')
      end
    end
  end
end
