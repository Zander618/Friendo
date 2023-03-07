Rails.application.routes.draw do



  get "/me", to: "users#show"

  resources :locations
  resources :meetups
  resources :dogs
  resources :users
  resources :images

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }

end
