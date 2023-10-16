Rails.application.routes.draw do
  devise_for :users
  root to: 'tasks#index'
  resources :tasks
end
