class Book < ApplicationRecord
  has_and_belongs_to_many :users
  has_and_belongs_to_many :authors
  belongs_to :genre
  has_many :notes
  validates :title, presence: true
end
