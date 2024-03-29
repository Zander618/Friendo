Rails.application.routes.draw do
  resources :messages

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }

  get "/me", to: "users#show"

  resources :locations, only: [:index, :create, :update]
  resources :meetups, only: [:index, :create, :update]
  resources :dogs
  resources :users, only: [:create, :update, :show]
  resources :images, only: [:index, :create]

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  delete "/dogimage/:id", to: "images#purge"
  post "/password/reset", to: "users#reset"
  post "password/forgot", to: "users#forgot"

end
