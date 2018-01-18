class User < ApplicationRecord
  ############################################################################################
  ## PeterGate Roles                                                                        ##
  ## The :user role is added by default and shouldn't be included in this list.             ##
  ## The :root_admin can access any page regardless of access settings. Use with caution!   ##
  ## The multiple option can be set to true if you need users to have multiple roles.       ##
  petergate(roles: [:admin, :editor], multiple: false)                                               ##
  ############################################################################################ 
 

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable,
         :trackable, :validatable, :omniauthable, omniauth_providers: [:google]

  # devise automatically requires email & password
  validates_presence_of :name

  # delete the user, delete the blog
  has_many :blogs, dependent: :destroy

  # set default user role
  after_create :set_role

  def set_role
    self.roles = 'editor'
  end

  # generate user based on omniauth data received from google
  def self.from_omniauth(auth)
    user = User.find_by_email(auth.info.email.downcase)
    # user has an existing account via devise/google
    if user
      self.update_user_attributes(user, auth)
    else
      self.sign_in_with_google(auth)
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.google_data"] && session["devise.google_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  # virtual methods for generating first & last name
  def first_name
    self.name.split.first
  end

  def last_name
    self.name.split.last
  end


  private
  def self.update_user_attributes(user, auth)
    user.update_attributes(provider: auth.provider, uid: auth.uid)
    user
  end

  def self.sign_in_with_google(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create! do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name
      # user.image = auth.info.image # assuming the user model has an image
    end
  end
end
