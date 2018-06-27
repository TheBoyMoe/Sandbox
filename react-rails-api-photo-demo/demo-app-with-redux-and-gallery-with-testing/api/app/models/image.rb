class Image < ApplicationRecord
  belongs_to :gallery, inverse_of: :images
  has_attached_file \
    :file,
    styles: { medium: ['300x300#', 'jpg'], thumb: ['32x32#', 'jpg'] },
    convert_options: {
      all: '-interlace Plane'
    },
    default_style: :medium,
    default_url: '/images/:attachment/default_:style.jpg'

  validates_attachment_presence :file
  validates_attachment_file_name :file, matches: [/png\Z/, /jpe?g\Z/, /gif\Z/]
end
