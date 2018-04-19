class User < ApplicationRecord
  include Clearance::User

  validates :email, inclusion: { in: %w(a@a.com b@b.com c@c.com) }
end
