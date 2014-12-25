get '/', to: 'home#index'

resource :user

resources :games, except: [:destroy]

resources :moves, only: [:index, :create]
