require 'test_helper'

class MyPostControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get my_post_create_url
    assert_response :success
  end

end
