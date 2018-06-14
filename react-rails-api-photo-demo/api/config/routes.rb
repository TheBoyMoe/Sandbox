Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :images, only: %i(index create show destroy)
      resources :users, only: %i(create show)
    end
  end
end
