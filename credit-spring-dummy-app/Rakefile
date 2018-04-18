# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative "config/application"

Rails.application.load_tasks

begin
  require "rubocop/rake_task"
  require "rspec/core/rake_task"
  RuboCop::RakeTask.new
  RSpec::Core::RakeTask.new(:spec)

  task default: %i(spec rubocop)
rescue LoadError
  nil
end
