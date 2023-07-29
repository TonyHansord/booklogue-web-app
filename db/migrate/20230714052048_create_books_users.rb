class CreateBooksUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :books_users do |t|
      t.references :book, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :read, default: false

      t.timestamps
    end
  end
end
