class AddOmniauthAttributesToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :provider, :string, limit: 50, null: false, default: ''
    add_column :users, :uid, :string, limit: 500, null: false, default: ''
    add_column :users, :oauth_token, :string
    add_column :users, :oauth_expires_at, :datetime
  end
end
