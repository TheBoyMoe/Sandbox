Rails.application.routes.draw do
  get 'account' => 'account#index'

  resource :session, controller: "clearance/sessions", only: [:create]

  resources :users, controller: "users", only: [:create]

  get "/sign_in" => "clearance/sessions#new", as: "sign_in"
  delete "/sign_out" => "account#destroy", as: "sign_out"
  get "/sign_up" => "users#new", as: "sign_up"

  root to: 'home#index'
end
