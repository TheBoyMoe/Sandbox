class V2::ImagesController < ApplicationController
  def index
    json_response({ message: 'Reply from api v2 - Nothing to see!'})
  end
end
