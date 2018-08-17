Rails.application.routes.draw do
  resources :users, only: :create, constraints: { format: 'json' } do
    get 'valid', on: :collection
    resources :watching_events, only: :create
  end
end
