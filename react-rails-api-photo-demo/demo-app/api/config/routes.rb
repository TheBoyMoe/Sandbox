Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :images, only: %i[index create show destroy]
      resources :users, only: %i[index create update destroy]
    end
  end

  # get login token from knock
  post 'user_token' => 'user_token#create'

  # home controller routes
  root 'home#index'
  get 'auth', to: 'home#auth'

  get '/api/v1/users/current', to: 'users#current'
end
