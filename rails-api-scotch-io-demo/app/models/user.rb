class User < ApplicationRecord
  has_many :todos, foreign_key: :created_by
  has_secure_password
  validates_presence_of :name, :email, :password_digest
end
