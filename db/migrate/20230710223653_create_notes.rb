class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.integer :book_id
      t.string :subject
      t.text :content

      t.timestamps
    end
  end
end
