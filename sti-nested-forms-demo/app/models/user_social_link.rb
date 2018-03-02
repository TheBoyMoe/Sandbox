class UserSocialLink < ApplicationRecord
  belongs_to :user
  belongs_to :social_link, dependent: :destroy
end
