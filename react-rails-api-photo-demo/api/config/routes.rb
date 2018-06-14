Rails.application.routes.draw do
  scope module: :v2, constraints: ApiVersion.new('v2') do
    resources :images, only: :index
  end

  scope module: :v1, constraints: ApiVersion.new('v1', true) do
    resources :users do
      resources :images
    end
  end
end
