get '/', to: 'home#index'

resource :user

resource :game, except: [:destroy]
