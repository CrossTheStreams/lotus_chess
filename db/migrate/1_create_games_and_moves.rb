Sequel.migration do
  up do

    create_table(:games) do
      primary_key :id
      String :fen_string
    end

    create_table(:moves) do
      primary_key :id      
      foreign_key :game_id, :games
      String :algebraic
      Boolean :valid
    end

  end

  down do
    drop_table(:moves)
    drop_table(:games)
  end
end
