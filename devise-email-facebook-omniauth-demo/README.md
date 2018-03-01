# Authentication using the Devise gem

Devise is a ruby gem that provides both authentication and authorisation(through roles). It includes views, controllers and routes.
It also supports the following features through various modules
- sends out confirmation emails
- supports account lockout after a certain number of failed logon attempts
- allows users to reset passwords
- supports 3rd party auth through the omniauthable module
- remembers users through cookies(manages the generating and clearing of tokens - the token is stored in the cookie)
- can timeout a user session that has been inactive for a set period of time
- can track a user's sign in's, their ip, number of sign ins, last sign in, current sign in. 

Several of these modules are enabled by default, once you generate the User model through the devise generator:

```ruby
rails generate devise User name:string
```

```ruby
# app/models/user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
```


## Devise Setup with Email confirmation

1. Add the following gems to your Gemfile

```ruby
gem 'devise', '~> 4.4', '>= 4.4.1'
gem 'dotenv-rails', '~> 2.2', '>= 2.2.1'
```

2. Run the devise install generator

```ruby
rails generate devise:install
```


3. Add the following line to `config/environments/development.rb`

```ruby
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```


4. Configure the e-mail address which will be shown in Devise::Mailer, this is the replay address to any emails sent out.

```ruby
# cong/initializers/devise.rb
config.mailer_sender = 'info@example.com'
```


5. Define a static route, controller action and template where users are redirected to following signup/login

6. Add the following flash messages to `app/views/layouts/application.html.erb`

```html
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
```


7. Generate the User model and run the migrations - adds the user sign in, sign out, registration routes, etc.  

```ruby
rails g devise User name:string
```


8. Generate the devise views

```ruby
rails generate devise:views
```


9. We need to amend `app/views/devise/registrations/new.html.erb` and `app/views/devise/registrations/edit/html.erb` views to include the name field.

10. Amend the User model requiring that the user enters a name in the sign up form. The requirement to enter an email and password is the default. If you try and register now , you'll receive the "Name can't be blank" error.

```ruby
validates :name, presence: true
```


We need to extend the `Devise::RegistrationsController`


```ruby
class RegistrationsController < Devise::RegistrationsController


	private
		def sign_up_params
			params.require(:user).permit(:name, :email, :password, :password_confirmation)
		end

		def account_update_params
			params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
		end
end
```

and amend the routing table, enabling devise to use the name attribute

```ruby
devise_for :users, controllers: { registrations: 'registrations' }
```


### Additional Customisation


11. Install Bootstrap 3(so that we can style the forms, flash and error messages consistently)

- add the following gems

```ruby
gem 'bootstrap-sass', '~> 3.3', '>= 3.3.7'
gem 'jquery-rails', '~> 4.3', '>= 4.3.1'
```

- rename `app/assets/stylesheets/application.css` to the `.scss` ext.
- delete it's contents and add

```scss
/*
 *= require main
 */
```

- create `main.scss` in `app/assets/stylesheets` and import your stylesheets through it, e.g.

```scss
// Global site styles
@import "bootstrap-sprockets";
@import "bootstrap";

// Base assets
//@import "base/mixins";
//@import "base/variables";


// Plugins
//@import "plugins/font-awesome";
```

- reference the req'd js files in `app/assets/javascripts/application.js`

```javascript 1.6
//
//= require jquery
//= require bootstrap-sprockets
//= require rails-ujs
//= require turbolinks
//= require_tree .
```


12. You can define custom devise error messages using a devise helper that will display flash messages which include bootstrap classes.
   
```ruby
# app/helpers/devise_helper.rb
module DeviseHelper
	def devise_error_messages!
		return '' if resource.errors.empty?
	
		messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
		html = <<-HTML
		 <div class="alert alert-danger alert-dismissible fade show" role="alert">
			 <button type="button" class="close" data-dismiss="alert">
				 <span aria-hidden="true">&times;</span>
			 </button>
			 <strong>
				#{pluralize(resource.errors.count, "error")} must be fixed
			 </strong>
			 #{messages}
		 </div>
		HTML
	
		html.html_safe
	end

	def devise_error_messages?
		!resource.errors.empty?
	end
end
```

13. Apply bootstrap styles on flash messages by implementing a custom flash message template, place in the `app/views/layout` folder.

```html
<% if flash.any? %>
	<div class="row">
		<div class="col-xs-12">
			<% flash.each do |name, message| %>
				<div class="alert alert-<%= name == 'notice' ? 'success' : 'warning' %> alert-dismissible" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<%= message %>
				</div>
			<% end %>
		</div>
	</div>
<% end %>
```

Call it in the `application.hml.erb` template like so:
 
```html
<%= render "layouts/flash_message" %>
```


14. Add a navbar template which will show a login/logout link depending on whether the user is logged in. Call the partial in the application layout.

```html
<!--app/layouts/_navbar.html.erb-->
<nav class="navbar navbar-default">
	<ul class="nav navbar-nav navbar-right">
		<% if user_signed_in? %>
			<li><%= link_to current_user.name, edit_user_registration_path %></li>
			<li><%= link_to "Log Out", destroy_user_session_path, method: :delete %></li>
		<% else %>
			<li><%= link_to "Log In", new_user_session_path %></li>
		<% end %>
	</ul>
</nav>0
```

15. simplify devise sign_up, sign_in and sign_out paths by editing `config/routes.rb`


```ruby
devise_for :users, path: '', path_names: {
		sign_in: 'login',   # 'users/sign_in' => 'login'
		sign_out: 'logout', # 'users/sign_out' => 'logout'
		sign_up: 'register' # 'users/sign_up' => 'register'
},
controllers: { registrations: 'registrations' }
```

16. Require that a user be logged in to use the site by adding the following line to `app/controllers/application_controller.rb`

```ruby
before_action :authenticate_user!
```

You will automatically redirected to the welcome page following successful authentication.


17. To enable email confirmation upon user registration through Devise(a user will not be able to logon to their account until the user has clicked on the link within the email), do the following:

- add the `:confirmable` property to the user model

```ruby
# app/models/user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

  validates :name, presence: true
end
```

- we'll need to add a series of columns to the user table. Create a migration and add the following content:

```ruby
class AddConfirmableToDevise < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    # add_column :users, :unconfirmed_email, :string # Only if using reconfirmable
    add_index :users, :confirmation_token, unique: true
    # User.reset_column_information # Need for some types of updates, but not for update_all.
    # To avoid a short time window between running the migration and updating all existing
    # users as confirmed, do the following
    User.all.update_all confirmed_at: DateTime.now
    # All existing user accounts should be able to log in after this.
  end

  def down
    remove_columns :users, :confirmation_token, :confirmed_at, :confirmation_sent_at
    # remove_columns :users, :unconfirmed_email # Only if using reconfirmable
  end
end
```

- run the migration, `bundle exec rake db:migrate`

- create a custom mailer that extends the `Devise::Mailer`. 

```ruby
# app/mailers/demo_mailer.rb
class DemoMailer < Devise::Mailer   
  helper :application # gives access to all helpers defined within `application_helper`.
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`
  default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views
end
```

- in `config/initializers/devise.rb`, set `config.mailer` to `"DemoMailer"` and `config.reconfirmable` to false

```ruby
# config/initializers/devise.rb
config.mailer = DemoMailer
config.reconfirmable = false
```

- for development we'll install the `mailcatcher` gem to act as a smtp server with the following command at the command prompt

```ruby
gem install mailcatcher
```

add the following configuration to `config/environments/development.rb`

```ruby
config.action_mailer.default_url_options = { :host => 'localhost:3000' }
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {:address => "localhost", :port => 1025}
```

and start the server by entering `mailcatcher` at the command prompt. Mailcatcher will be running on port 1025 catching emails and displaying them on HTTP port 1080. After registration, go to `http://localhost:1080`, open the confirmation email and click on the link. Your account will be activated allowing you to now login.

To ensure that your tests run properly, set the `:host` in your `config/routes.rb` file:

```ruby
# config/routes/rb
default_url_options :host => "example.com"
```



Alternatively you can configure Gmail
- we need to configure the the mailer send out emails via Gmail in development(in production we would use a proper smtp service). Add the following configuration to `config/environments/development.rb`

```ruby
# config/environments/development.rb
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
		:address              => "smtp.gmail.com",
		:port                 => 587,
		:user_name            => ENV['GMAIL_USERNAME'],
		:password             => ENV['GMAIL_PASSWORD'],
		:authentication       => "plain",
		:enable_starttls_auto => true
}
```


Add the `GMAIL_USERNAME` and `GMAIL_PASSWORD` settings to `.env` file in the root of the app. Don't forget to add the file to `.gitignore` so it's excluded from the repository(the `dotenv-rails` gem will load the file).

```text
GMAIL_USERNAME=xxxxxxxxxxx
GMAIL_PASSWORD=xxxxxxxxxxx
```


## Facebook Authentication Setup

1. Sdd the omniauth gems to the Gemfile

```ruby
gem 'omniauth', '~> 1.8', '>= 1.8.1'
gem 'omniauth-facebook', '~> 4.0'
```

2. We need to add two columns to our Users table, `provider` which will be either facebook or nil and `uid` to store the user's id as provided by Facebook upon successful authentication - both string data type, and run the migration. Using the datatype as `index`, sets the column's datatype to `string` and adds an index for the column.


```text
bundle exec rails g migration AddOmniauthToUsers provider:index uid:index
```


3. Create an app in the [Facebook Developer Console](https://developers.facebook.com/apps), make a note of the:
- App Key(App ID)
- App Secret
- and set the callback url to `http://localhost:3000/users/auth/facebook/callback`, check 'Facebook Login' > 'Settings'



4. Update `.env` file with the app's settings

```text
ENV["FACEBOOK_KEY"]=xxxxxxxxxxxxxxxxxxx
ENV["FACEBOOK_SECRET"]=xxxxxxxxxxxxxxxxxxx
```


5. Declare the provider in `config/initializers/devise.rb` - scope gives us access to the user's email and name

```ruby
config.omniauth :facebook, ENV["FACEBOOK_KEY"], ENV["FACEBOOK_SECRET"], scope: 'name,email'
```

6. Enable Devise's omniauthible module and declaer the provider in the user model

```ruby
# app/models/user.rb
devise :omniauthable, omniauth_providers: %i[facebook]
```


7. Define the callback route(`omniauth_callbacks: 'users/omniauth_callbacks'`) Facebook will use to return the user's data upon successful authentication. The `config/routes.rb` file will look like so


```ruby
# config/routes.rb - devise section
devise_for :users, path: '', path_names: {
		sign_in: 'login',   # 'users/sign_in' => 'login'
		sign_out: 'logout', # 'users/sign_out' => 'logout'
		sign_up: 'register' # 'users/sign_up' => 'register'
},
controllers: {
		registrations: 'registrations',
		omniauth_callbacks: 'users/omniauth_callbacks'
}

# ...... more
```

Devise will create GET and POST routes for each of the following paths:
- user_facebook_omniauth_authorize_path, and
- user_facebook_omniauth_callback_path


NOTE: Devise does NOT create _url routes, and you only need to use `user_facebook_omniauth_authorize_path` in your layouts. 


```html
<%= link_to "Sign in with Facebook", user_facebook_omniauth_authorize_path %>
```

Clicking on the link redirects the user to Facebook. After successful authentication the user will be redirected back to your app's callback method - requires creating a controller and action.


8. Define a controller which extends `Devise::OmniauthCallbacksController` and implements the callback as an action with the same name as the provider.


```ruby
# app/controllers/users/omniauth_callbacks_controller.rb
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	def facebook
  		@user = User.from_omniauth(request.env["omniauth.auth"])
  		if @user.persisted?
  			sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
  			set_flash_message(:notice, :success, kind: "Facebook") if is_navigational_format?
  		else
  			session["devise.facebook_data"] = request.env["omniauth.auth"]
  			redirect_to new_user_registration_url
  		end
  	end
  
  	def failure
  		redirect_to root_path, alert: "Authentication through Facebook failed"
  	end
end
```

Note:
- All information retrieved from Facebook by OmniAuth is available as a hash at request.env["omniauth.auth"]
-When a valid user is found, they can be signed in with one of two Devise methods: sign_in or sign_in_and_redirect.
- When the user cannot be found in the database and a new one could not be created, we store the OmniAuth data in the session and redirect the user back to the registration form.


9. Define the `User.from_omniauth` method - find an existing user by the provider and uid fields. If no user is found, a new one is created with a random password.


```ruby
# app/models/user.rb
def self.from_omniauth(auth)
	where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
		user.email = auth.info.email
		user.password = Devise.friendly_token[0,20]
		user.name = auth.info.name
		user.skip_confirmation!
	end
end 
```




#### References

Bootstrap configuration  
[Integrating Bootstrap 3 into a Rails App](https://rails.devcamp.com/professional-rails-development-course/ui-ux-integration/implementing-twitter-bootstrap-into-a-rails-application)  
[Organising Stylesheets in a Rails App](https://mattboldt.com/organizing-css-and-sass-rails/)  


Email configuration:  
[Configure Devise to send a confirmation email](https://github.com/plataformatec/devise/wiki/How-To:-Use-custom-mailer)  
[Custom Mailer](https://github.com/plataformatec/devise/wiki/How-To:-Use-custom-mailer)  
[Rails ActionMailer Basics](http://guides.rubyonrails.org/action_mailer_basics.html)  
[Sending emails using ActionMailer and Gmail](https://launchschool.com/blog/handling-emails-in-rails)    
[Setup mailcatcher gem to capture emails](https://stackoverflow.com/questions/8186584/how-do-i-set-up-email-confirmation-with-devise)  


Facebook Configuration  
[Facebook setup with Devise](https://github.com/plataformatec/devise/wiki/omniauth:-overview)  
[Facebook Omniauth Settings](https://github.com/mkdynamic/omniauth-facebook)  
