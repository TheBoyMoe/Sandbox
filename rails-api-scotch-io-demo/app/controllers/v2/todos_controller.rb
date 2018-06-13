class V2::TodosController < ApplicationController
  def index
    json_response({ message: 'Message from v2'})
  end
end
