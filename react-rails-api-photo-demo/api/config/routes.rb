Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :images, only: [:index, :create, :show]
      resources :users, only: [:create, :show]
    end
  end
end
