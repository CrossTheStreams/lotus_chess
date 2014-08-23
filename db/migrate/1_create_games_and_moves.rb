Sequel.migration do
  up do
    create_table(:games) do
      primary_key :id
    end

    create_table(:moves) do
      primary_key :id      
      foreign_key :game_id, :games
      String :algebraic
      String :fen_string
      Boolean :valid
    end
  end

  down do
    drop_table(:moves)
    drop_table(:games)
  end
end
