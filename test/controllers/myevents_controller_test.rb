require 'test_helper'

class MyeventsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get myevents_new_url
    assert_response :success
  end

  test "should get create" do
    get myevents_create_url
    assert_response :success
  end

end
