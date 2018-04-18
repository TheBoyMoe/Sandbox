# README

This is a small, textbook Rails app, to be used for experiments and interviews.

## Setup instructions

It's a standard Rails app, on SQLite. No extra services required.

It runs on Ruby 2.4.2:
  ```
  rbenv install 2.4.2
  ```

Clone the repo and bundle:
  ```
  git clone https://github.com/dncrht/dummy.git dummy
  cd dummy
  bundle
  ```

Migrate the database:
  ```
  bin/rake db:setup
  ```

Now you can start the server and play with it on the browser:
  ```
  rails server
  open http://localhost:3000
  ```

## How to run the test suite
Uses the default rake task to run tests RSpec as well as verify code style guide with Rubocop.
  ```
  bin/rake
  ```

To only run specs
  ```
  bin/rspec
  ```

To check written code complies with the style guide
  ```
  bin/rubocop
  bin/rubocop -a # -a switch attempts to auto-fix any style guide violations.
  ```
