require 'test_helper'

class Api::SalesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_sales_index_url
    assert_response :success
  end

  test "should get show" do
    get api_sales_show_url
    assert_response :success
  end

  test "should get new" do
    get api_sales_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_sales_edit_url
    assert_response :success
  end

end
