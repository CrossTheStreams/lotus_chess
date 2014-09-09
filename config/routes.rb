get '/', to: 'home#index'

resource :user

resources :games, except: [:destroy]

resources :moves, except: [:destroy]
