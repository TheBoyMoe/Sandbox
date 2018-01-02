require 'rails_helper'

RSpec.feature "user log in" do
	scenario "using google oauth2" do
		stub_omniauth
		visit root_path
		expect(page).to have_link("Sign in with Google")
		click_link "Sign in with Google"
		expect(page).to have_content("Tom Jones")
		expect(page).to have_link("Logout")
	end

	def stub_omniauth
		# set omniauth in test mode
		OmniAuth.config.test_mode = true

		# fake auth data
		OmniAuth.config.mock_auth[:google] = OmniAuth::AuthHash.new({
			provider: "google",
			uid: "1234567890",
			info: {
				email: "tom.jones@example.com",
				first_name: "Tom",
				last_name: "Jones"
			},
			credentials: {
				token: "abcdefghijk1234567890",
				refresh_token: "abcdefghijk1234567890",
				expires_at: DateTime.now
			}
		})
	end
end