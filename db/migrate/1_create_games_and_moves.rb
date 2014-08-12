Sequel.migration do
  up do
    create_table(:games) do
      primary_key :id
      String :name, :null=>false
    end
    create_table(:moves) do
      primary_key :id      
    end
  end

  down do
    drop_table(:games)
  end
end
