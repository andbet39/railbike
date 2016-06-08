require 'test_helper'

class MembershipControllerTest < ActionDispatch::IntegrationTest
  test "should get join" do
    get membership_join_url
    assert_response :success
  end

end
