# Review of Project and cross-reference or relevant reference materials from the course


## Overview

In this lesson you're going to build a complete Ruby on Rails application that manages related data through complex forms and RESTful routes. The goal of the application is to build a Content Management System, whether the content being managed is Blog Posts, Recipes, a Library of Resources, or any domain model that lends itself to these requirements (the majority of ideas you could come up with would probably meet the requirements).


## Initial setup

1. Build the initial Rails app with the following command so Mini-test framework is not added.

```ruby
	rails new [app_name] -T
```

2. Add the following gems to the app's Gemfile:

```ruby
	group :development, :test do
    gem 'sqlite3'
    gem 'byebug'
  end
  
  group :test do
    gem 'rspec-rails', '~> 3.7', '>= 3.7.2'
      gem 'cucumber-rails', '~> 1.5'
      gem 'cucumber-rails-training-wheels'
      gem 'simplecov', '~> 0.15.1'
      gem 'capybara', '~> 2.17'
      gem 'database_cleaner', '~> 1.6', '>= 1.6.2'
      gem 'launchy', '~> 2.4', '>= 2.4.3'
  end
```

3. Run the following commands to install Cucumber, Capybara, Rspec and Simplecov gems

```ruby
	rails generate cucumber:install capybara
  rails generate cucumber_rails_training_wheels:install
  rails generate rspec:install
``` 

4. Create a new file called rspec.rb in features/support with the following contents:

```ruby
	require 'rspec/core'
  
  RSpec.configure do |config|
    config.mock_with :rspec do |c|
      c.syntax = [:should, :expect]
    end
    config.expect_with :rspec do |c|
      c.syntax = [:should, :expect]
    end
  end
```

5. add the following code BEFORE ANYTHING ELSE ON LINE ONE of spec/rails_helper.rb and features/support/env.rb:

```ruby
	require 'simplecov'
  SimpleCov.start 'rails'
```

6. Automate RSpec tests with the Guard gem. Add the following to the 'group: test' section in the Gemfile


```text
	gem 'guard-rspec'
```

After running 'bundle install', generate the 'Guardfile', and start it.

```ruby
	bundle exec guard init rspec # generate guard file
	bundle exec guard # start guard
 ```

7. Enable debugging, add "gem 'byebug'" to the development/test group in the Gemfile, and add "require 'byebug'" to spec_helper.rb file to enable interactive debugging. 


8. Prepare the test base, run the first time or when the schema changes

```text
	rails db:migrate
	rails db:test:prepare 
```
