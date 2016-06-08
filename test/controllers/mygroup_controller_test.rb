require 'test_helper'

class MygroupControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get mygroup_index_url
    assert_response :success
  end

  test "should get show" do
    get mygroup_show_url
    assert_response :success
  end

end
