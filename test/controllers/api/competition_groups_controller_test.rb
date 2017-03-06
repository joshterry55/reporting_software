require 'test_helper'

class Api::CompetitionGroupsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_competition_groups_index_url
    assert_response :success
  end

  test "should get show" do
    get api_competition_groups_show_url
    assert_response :success
  end

  test "should get new" do
    get api_competition_groups_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_competition_groups_edit_url
    assert_response :success
  end

end
