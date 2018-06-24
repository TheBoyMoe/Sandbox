class ImageSerializer < ActiveModel::Serializer
  attributes :id, :title, :path, :created_at

  has_one :file
  belongs_to :user
end