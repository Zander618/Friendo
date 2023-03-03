Rails.application.routes.draw do
  namespace :api do

    get "/me", to: "users#show"

    resources :locations
    resources :meetups
    resources :dogs
    resources :users
    resources :images

    post "/signup", to: "users#create"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  # root "articles#index"
end
