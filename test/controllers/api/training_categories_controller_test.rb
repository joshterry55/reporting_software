require 'test_helper'

class Api::TrainingCategoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_training_categories_index_url
    assert_response :success
  end

  test "should get show" do
    get api_training_categories_show_url
    assert_response :success
  end

  test "should get new" do
    get api_training_categories_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_training_categories_edit_url
    assert_response :success
  end

end
