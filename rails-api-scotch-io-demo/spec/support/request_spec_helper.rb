module RequestSpecHelper

  def json
    # parse json response to ruby hash
    JSON.parse(response.body)
  end
end
