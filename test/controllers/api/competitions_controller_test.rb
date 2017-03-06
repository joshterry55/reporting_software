require 'test_helper'

class Api::CompetitionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_competitions_index_url
    assert_response :success
  end

  test "should get show" do
    get api_competitions_show_url
    assert_response :success
  end

  test "should get new" do
    get api_competitions_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_competitions_edit_url
    assert_response :success
  end

end
