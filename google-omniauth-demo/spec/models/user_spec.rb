require 'rails_helper'

RSpec.describe User, type: :model do
  it "creates or updates itself from an oauth hash" do
		auth = {
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
		}

		User.update_or_create(auth)
		new_user = User.last
		expect(new_user.provider).to eq("google")
		expect(new_user.uid).to eq("1234567890")
		expect(new_user.email).to eq("tom.jones@example.com")
		expect(new_user.first_name).to eq("Tom")
		expect(new_user.last_name).to eq("Jones")
		expect(new_user.token).to eq("abcdefghijk1234567890")
		expect(new_user.refresh_token).to eq("abcdefghijk1234567890")
		expect(new_user.oauth_expires_at.strftime("%a, %d %b %Y %H:%M:%S")).to eq(auth[:credentials][:expires_at].strftime("%a, %d %b %Y %H:%M:%S"))
	end

end
