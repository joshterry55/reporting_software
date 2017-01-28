Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: {
  registrations: "api/registrations",
  sessions: "api/sessions",
}

  namespace :api do
    resources :users
    resources :companies
    resources :regions
    resources :offices
    resources :announcements

  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
