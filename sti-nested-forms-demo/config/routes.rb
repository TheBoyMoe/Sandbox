Rails.application.routes.draw do
  resources :users
	root to: 'users#index'

	# direct any request forfounders or developers to the Users controller and set the appropriate type
	resources :developers, controller: 'users', type: 'Developer'
	resources :founders, controller: 'users', type: 'Founder'
end
