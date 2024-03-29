class User < ApplicationRecord
  before_create -> { self.token = generate_token }
  has_many :posts

  validates :name, presence: true

  private
    def generate_token
      loop do
        token = SecureRandom.hex
        return token unless User.exists?({token: token})
      end
    end
end
