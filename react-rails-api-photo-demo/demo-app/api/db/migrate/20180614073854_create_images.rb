class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string :title
      t.string :path
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
