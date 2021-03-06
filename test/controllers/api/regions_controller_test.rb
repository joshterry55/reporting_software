require 'test_helper'

class Api::RegionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_regions_index_url
    assert_response :success
  end

  test "should get new" do
    get api_regions_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_regions_edit_url
    assert_response :success
  end

  test "should get show" do
    get api_regions_show_url
    assert_response :success
  end

end
