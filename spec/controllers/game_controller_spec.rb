class WebChess::Controllers::Game

  describe Show do

    let(:params) do
      {id: 1} 
    end

    let(:game) do
      double("game", id: 1) 
    end

    before do
      allow(WebChess::Model::GameRepository).to receive(:find).with(params[:id]).and_return(game)
    end

    it "finds the game" do
      expect(WebChess::Model::GameRepository).to receive(:find).and_return(game)
      subject.call(params)
    end

  end

end

