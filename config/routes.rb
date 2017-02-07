Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: {
  registrations: "api/registrations",
  sessions: "api/sessions",
  invitations: "api/invitations"
}

  namespace :api do
    get 'users/info'
    get 'office/:id/users', as: 'office/users', :to => 'users#index'
    get 'company/:id/users', as: 'company/users', :to => 'users#employees'
    get 'office/:id/sales', as: 'office/sales', :to => 'sales#office'
    get 'company/:id/regions', as: 'company/regions', :to => 'companies#regions'
    get 'company/:id/offices', as: 'company/offices', :to => 'companies#offices'
    resources :users
    resources :companies
    resources :regions
    resources :offices
    resources :announcements
    resources :sales

  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '*unmatched_route', to: 'home#index'
end
