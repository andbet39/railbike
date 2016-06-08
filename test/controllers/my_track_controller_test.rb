require 'test_helper'

class MyTrackControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get my_track_index_url
    assert_response :success
  end

end
