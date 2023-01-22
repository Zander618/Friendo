Rails.application.routes.draw do
  resources :locations
  resources :meetups
  resources :dog_meetups
  resources :dogs
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
