Rails.application.routes.draw do

  resources :blogs
	# customize sign_in, _up, _out routes
  devise_for :users, path: '', path_names: {
			sign_in: 'login',   # 'users/sign_in' => 'login'
			sign_out: 'logout', # 'users/sign_out' => 'logout'
			sign_up: 'register' # 'users/sign_up' => 'register'
	}

	root to: "blogs#index"
end
