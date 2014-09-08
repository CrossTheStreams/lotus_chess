get '/', to: 'home#index'

resource :user

resources :game, except: [:destroy]
