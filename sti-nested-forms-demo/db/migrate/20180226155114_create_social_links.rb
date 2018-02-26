class CreateSocialLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :social_links do |t|
      t.string :name
      t.string :url

      t.timestamps
    end
  end
end
