class ModifyGenreRelationship < ActiveRecord::Migration[7.0]
  def change
    add_reference :books, :genre, foreign_key: true
  end
end
