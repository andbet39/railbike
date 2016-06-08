require 'test_helper'

class TracksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @track = tracks(:one)
  end

  test "should get index" do
    get tracks_url
    assert_response :success
  end

  test "should get new" do
    get new_track_url
    assert_response :success
  end

  test "should create track" do
    assert_difference('Track.count') do
      post tracks_url, params: { track: { description: @track.description, distance: @track.distance, elevation: @track.elevation, name: @track.name, start_lat: @track.start_lat, start_lng: @track.start_lng } }
    end

    assert_redirected_to track_path(Track.last)
  end

  test "should show track" do
    get track_url(@track)
    assert_response :success
  end

  test "should get edit" do
    get edit_track_url(@track)
    assert_response :success
  end

  test "should update track" do
    patch track_url(@track), params: { track: { description: @track.description, distance: @track.distance, elevation: @track.elevation, name: @track.name, start_lat: @track.start_lat, start_lng: @track.start_lng } }
    assert_redirected_to track_path(@track)
  end

  test "should destroy track" do
    assert_difference('Track.count', -1) do
      delete track_url(@track)
    end

    assert_redirected_to tracks_path
  end
end
