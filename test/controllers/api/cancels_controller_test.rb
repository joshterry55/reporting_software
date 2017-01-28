require 'test_helper'

class Api::CancelsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_cancels_index_url
    assert_response :success
  end

  test "should get show" do
    get api_cancels_show_url
    assert_response :success
  end

  test "should get new" do
    get api_cancels_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_cancels_edit_url
    assert_response :success
  end

end
