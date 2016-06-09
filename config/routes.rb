Rails.application.routes.draw do



  resources :action_types
  resources :tracks
  resources :events
  resources :posts
  resources :groups


  get 'my_post/create'
  get 'my_post_controller/new'
  get 'my_post_controller/create'

  get 'myevents/new'
  get 'myevents/show/:id', to:'myevents#show'
  get 'myevents/create'

  get 'mygroup/show/:id', to:'mygroup#show'
  get 'mygroup/new/:group_id', to:'myevents#new'
  get 'mygroup/index'
  post 'mygroup/add_post', to:'mygroup#add_post'


  get 'membership/join/:group_id', to: 'membership#join'

  get 'my_track/index', to: 'my_track#index'
  get 'mytrack/findinbound', to:'my_track#findInBound'
  get 'mytrack/find', to:'my_track#find'
  get 'mytrack/:id', to:'my_track#get'


  post 'partecipation/partecipate', to: 'partecipation#partecipate'
  post 'partecipation/remove', to: 'partecipation#remove_partecipate'
  get 'partecipation/getbyevent/:event_id', to: 'partecipation#partecipantsByEvent'

  get 'map/index'

  devise_for :users

  root 'mygroup#index'
  post 'tracks/building/build' , to: 'track/build#create'
  get 'tracks/building/build' , to: 'track/build#new'

  resources :tracks do
    resources :build, controller: 'track/build'
  end


end
