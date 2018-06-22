class Image < ApplicationRecord
  belongs_to :user
  has_one_attached :photo

  validates :title, presence: true
  validates :path, presence: true
end
