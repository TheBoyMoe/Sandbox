class CreateUserSocialLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :user_social_links do |t|
      t.references :user, foreign_key: true
      t.references :social_link, foreign_key: true

      t.timestamps
    end
  end
end
