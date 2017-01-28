require 'test_helper'

class Api::SitesurveysControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_sitesurveys_index_url
    assert_response :success
  end

  test "should get show" do
    get api_sitesurveys_show_url
    assert_response :success
  end

  test "should get new" do
    get api_sitesurveys_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_sitesurveys_edit_url
    assert_response :success
  end

end
