class CreateCovers < ActiveRecord::Migration[5.2]
  def change
    create_table :covers do |t|
      t.integer :book_id

      t.timestamps
    end
  end
end
