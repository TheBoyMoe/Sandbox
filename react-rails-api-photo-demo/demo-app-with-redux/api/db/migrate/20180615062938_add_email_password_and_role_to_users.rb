class AddEmailPasswordAndRoleToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :email, :string, index: true, unique: true
    add_column :users, :password_digest, :string
    add_column :users, :role, :string, default: 'user'
    add_column :users, :last_login, :datetime
  end
end
