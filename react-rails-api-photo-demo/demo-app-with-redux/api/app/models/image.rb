class Image < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :path, presence: true

  has_one_attached :file # active storage
  # attr_accessor :file_base # base64 endcoded string

  
  # paperclip
  # has_attached_file :file, styles: {medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  # validates_attachment :file, presence: true, content_type: { content_type: "image/jpg" }
  # do_not_validate_attachment_file_type :file

end
