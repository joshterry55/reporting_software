require 'test_helper'

class Api::TrainingVideosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_training_videos_index_url
    assert_response :success
  end

  test "should get show" do
    get api_training_videos_show_url
    assert_response :success
  end

  test "should get new" do
    get api_training_videos_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_training_videos_edit_url
    assert_response :success
  end

end
