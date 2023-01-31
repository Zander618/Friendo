Rails.application.routes.draw do

  get "/me", to: "users#show"

  resources :locations
  resources :meetups
  resources :dog_meetups
  resources :dogs
  resources :users
  resources :images

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
