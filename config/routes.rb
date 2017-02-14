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
    get 'region/:id/sales', as: 'region/sales', :to => 'sales#region'
    get 'company/:id/sales', as: 'company/sales', :to => 'sales#company'
    get 'company/:id/regions', as: 'company/regions', :to => 'companies#regions'
    get 'company/:id/offices', as: 'company/offices', :to => 'companies#offices'
    get 'company/:id/categories', as: 'company/categories', :to => 'training_categories#show'
    resources :users
    resources :companies
    resources :regions
    resources :offices
    resources :announcements
    resources :sales
    resources :training_categories

  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '*unmatched_route', to: 'home#index'
end
