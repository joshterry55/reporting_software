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
    get 'company/:id/comp_users', as: 'company/comp_users', :to => 'users#competition_employees'
    get 'office/:id/sales', as: 'office/sales', :to => 'sales#office'
    get 'region/:id/sales', as: 'region/sales', :to => 'sales#region'
    get 'user/:id/sales', as: 'user/sales', :to => 'sales#user'
    get 'user/:id/three_month', as: 'user/three_month', :to => 'sales#this_month'
    get 'user/:id/six_month', as: 'user/six_month', :to => 'sales#six_month'
    get 'company/:id/sales', as: 'company/sales', :to => 'sales#company'
    get 'company/:id/regions', as: 'company/regions', :to => 'companies#regions'
    get 'company/:id/offices', as: 'company/offices', :to => 'companies#offices'
    get 'company/:id/categories', as: 'company/categories', :to => 'training_categories#show'
    get 'company/:id/sections', as: 'company/sections', :to => 'training_sections#index'
    get 'company/:id/videos', as: 'company/videos', :to => 'training_videos#index'
    get 'training_sections/:id/training_videos', as: 'training_section/training_videos', :to => 'training_videos#show'
    get 'company/sales/search', as: 'sales/search', :to => 'sales#search'
    get 'company/:id/active_competitions', as: 'company/active_competitions', :to => 'competitions#active'
    get 'company/:id/not_started_competitions', as: 'company/not_started_competitions', :to => 'competitions#not_started'
    get 'company/:id/completed_competitions', as: 'company/completed_competitions', :to => 'competitions#completed'
    get 'competition/:id/prizes', as: 'competition/prizes', :to => 'prizes#show'
    get 'competition/:id/competition_groups', as: 'competition/competition_groups', :to => 'competition_groups#show'
    get 'company/:id/competition_sales', as: 'company/competition_sales', :to => 'sales#competition_sales'
    get 'user/:id/wage_sales', as: 'user/wage_sales', :to => 'sales#wage_sales'
    get 'user/:id/all_employee_customers', as: 'user/all_employee_customers', :to => 'sales#all_employee_customers'
    put 'training_sections/:id/avatar', as: 'training_section/avatar', :to => 'training_sections#add_avatar'
    put 'company/:id/avatar', as: 'company/avatar', :to => 'companies#add_avatar'
    put 'prizes/:id/avatar', as: 'prizes/avatar', :to => 'prizes#add_avatar'
    put 'users/:id/avatar', as: 'users/avatar', :to => 'users#add_avatar'
    resources :users
    resources :companies
    resources :regions
    resources :offices
    resources :announcements
    resources :sales
    resources :training_categories
    resources :training_sections
    resources :training_videos
    resources :competitions
    resources :prizes
    resources :competition_groups
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '*unmatched_route', to: 'home#index'
end
