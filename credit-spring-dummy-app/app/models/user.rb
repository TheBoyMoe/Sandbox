class User < ApplicationRecord
  include Clearance::User

  validates :email, {presence: true, uniqueness: true, inclusion: {in: %w(a@a.com b@b.com c@c.com)}}
end
