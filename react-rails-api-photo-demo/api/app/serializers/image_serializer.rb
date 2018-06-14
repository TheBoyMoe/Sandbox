class ImageSerializer < ActiveModel::Serializer
  attributes :id, :title, :path, :created_at

  belongs_to :user
end