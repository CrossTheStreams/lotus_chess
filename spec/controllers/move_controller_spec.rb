require 'spec_helper'

class WebChess::Controllers::Moves

  describe Create do

    before do
      WebChess::Model::GameRepository.create(WebChess::Model::Game.new)
    end

    let(:game) { WebChess::Model::GameRepository.first }

    let(:rack_form_hash) do
      {"rack.request.form_hash" => {"move"=>{:from=>"f2", :to=>"f4"}, "game_id"=> game.id, "fen"=>"rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1"}}
    end

    let(:params) do 
      {}
    end

    before do
      allow_any_instance_of(Lotus::Action::Params).to receive(:env).and_return(rack_form_hash)
    end
  
    it "creates a Move" do
      expect{subject.call(params)}.to change{WebChess.db[:moves].count}.from(0).to(1)
    end

  end

end
