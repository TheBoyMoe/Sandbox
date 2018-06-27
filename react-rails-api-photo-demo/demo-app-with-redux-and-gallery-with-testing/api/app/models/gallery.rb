class Gallery < ApplicationRecord
  validates :title, presence: :true

  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  def as_json(_opts = {})
    {
      id: id,
      title: title,
      description: description,
      errors: errors,
      image_files: images.map do |image|
        {
          url: "http://localhost:6999#{image.file.url}",
          name: image.file_file_name,
          id: image.id
        }
      end
    }
  end
end
