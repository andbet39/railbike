require 'test_helper'

class ActionTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @action_type = action_types(:one)
  end

  test "should get index" do
    get action_types_url
    assert_response :success
  end

  test "should get new" do
    get new_action_type_url
    assert_response :success
  end

  test "should create action_type" do
    assert_difference('ActionType.count') do
      post action_types_url, params: { action_type: { description: @action_type.description, entity: @action_type.entity } }
    end

    assert_redirected_to action_type_path(ActionType.last)
  end

  test "should show action_type" do
    get action_type_url(@action_type)
    assert_response :success
  end

  test "should get edit" do
    get edit_action_type_url(@action_type)
    assert_response :success
  end

  test "should update action_type" do
    patch action_type_url(@action_type), params: { action_type: { description: @action_type.description, entity: @action_type.entity } }
    assert_redirected_to action_type_path(@action_type)
  end

  test "should destroy action_type" do
    assert_difference('ActionType.count', -1) do
      delete action_type_url(@action_type)
    end

    assert_redirected_to action_types_path
  end
end
