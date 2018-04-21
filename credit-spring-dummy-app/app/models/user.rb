class User < ApplicationRecord
  include Clearance::User
  validates :email, inclusion: { in: %w(a@a.com b@b.com c@c.com) }

  # compare email vs white list in database table
  # validates :email, inclusion: { in: proc { Whitelist.find_by(email: email) } }
end
