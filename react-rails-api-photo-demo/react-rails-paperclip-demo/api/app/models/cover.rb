class Cover < ApplicationRecord
  belongs_to :book, inverse_of: :covers
  has_attached_file \
    :photo,
    styles: { medium: ['300x300#', 'jpg'], thumb: ['32x32#', 'jpg'] },
    convert_options: {
      all: '-interlace Plane'
    },
    default_style: :medium,
    default_url: '/images/:attachment/default_:style.png'

  validates_attachment_presence :photo
  validates_attachment_file_name :photo, matches: [/png\Z/, /jpe?g\Z/, /gif\Z/]
end