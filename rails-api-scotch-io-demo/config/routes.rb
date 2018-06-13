Rails.application.routes.draw do

  # dummy v2
  scope module: :v2, constraints: ApiVersion.new('v2') do
    resources :todos, only: :index
  end


  # in order to not have the version number as part of the uri,
  # use module scope to namespace the controllerson
  # set v1 as the default when it's not provided
  # any other api versions must be plced above this one
  scope module: :v1, constraints: ApiVersion.new('v1', true) do
    resources :todos do
      resources :items
    end
  end

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end
