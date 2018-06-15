class User < ApplicationRecord
  has_many :images
  has_secure_password

  before_validation :set_email

  validates_presence_of :name, on: :create, message: "can't be blank"
  validates_presence_of :email, on: :create, message: "can't be blank"
  validates_uniqueness_of :email, on: :create, message: "must be unique"
  validates_length_of :password, maximum: 72, minimum: 8, allow_nil: true, allow_blank: false
  validates_confirmation_of :password, allow_nil: true, allow_blank: false

  def set_email
    self.email = self.email.to_s.downcase
  end

  def can_modify_user?(user_id)
    is_admin? || id.to_s == user_id.to_s
  end

  def is_admin?
    role == 'admin'
  end
end
