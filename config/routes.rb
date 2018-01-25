Rails.application.routes.draw do
	root 'transaction_histories#index'
  resources :transaction_histories
  devise_for :users

  namespace :manager do
    resources :transaction_histories
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
