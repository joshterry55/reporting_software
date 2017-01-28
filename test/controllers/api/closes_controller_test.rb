require 'test_helper'

class Api::ClosesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_closes_index_url
    assert_response :success
  end

  test "should get show" do
    get api_closes_show_url
    assert_response :success
  end

  test "should get new" do
    get api_closes_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_closes_edit_url
    assert_response :success
  end

end
