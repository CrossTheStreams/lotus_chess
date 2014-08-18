mapper = Lotus::Model::Mapper.new do

end

adapter = Lotus::Model::Adapters::SqlAdapter.new(mapper, "postgres://localhost:5432/web_chess_#{WebChess.env}")
