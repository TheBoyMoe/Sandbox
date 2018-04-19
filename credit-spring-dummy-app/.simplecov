SimpleCov.start 'rails' do
  add_filter 'app/jobs/application_job.rb'
  add_filter 'app/controllers/home_controller.rb'
  add_filter 'app/controllers/account_controller.rb'
end
