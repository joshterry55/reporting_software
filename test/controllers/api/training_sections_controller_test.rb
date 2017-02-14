require 'test_helper'

class Api::TrainingSectionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_training_sections_index_url
    assert_response :success
  end

  test "should get show" do
    get api_training_sections_show_url
    assert_response :success
  end

  test "should get new" do
    get api_training_sections_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_training_sections_edit_url
    assert_response :success
  end

end
