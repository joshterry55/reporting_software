require 'test_helper'

class Api::PrizesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_prizes_index_url
    assert_response :success
  end

  test "should get show" do
    get api_prizes_show_url
    assert_response :success
  end

  test "should get new" do
    get api_prizes_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_prizes_edit_url
    assert_response :success
  end

end
