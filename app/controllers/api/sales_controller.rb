class Api::SalesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def office
    @office = Office.find(params[:id])
    @week_dates = params[:startday]
    @sales = @office.sales.where(date: @week_dates)
    render json: @sales

  end

  def region
    @region = Region.find(params[:id])
    @region_week_dates = params[:startday]
    @sales = @region.sales.where(date: @region_week_dates)
    render json: @sales

  end

  def company
    @company = Company.find(params[:id])
    @company_week_dates = params[:startday]
    @sales = @company.sales.where(date: @company_week_dates)
    render json: @sales

  end

  def user
    @user = User.find(params[:id])
    @sales = @user.sales.where(site_survey: '1')
    render json: @sales
  end

  def three_month
    @user = User.find(params[:id])
    @sales = @user.sales.where(date: (Time.now.beginning_of_month)..(Time.now.end_of_month))
    render json: @sales
  end

  def this_month
    @user = User.find(params[:id])
    @sales = @user.sales.where(date: (Time.now.beginning_of_month)..(Time.now.end_of_month))
    render json: @sales
  end

  def six_month
    @user = User.find(params[:id])
    @sales = @user.sales.where(date: (Time.now.beginning_of_month - 5.months)..(Time.now.end_of_month))
    render json: @sales
  end

  def search
    @company = Company.find(params[:id])
    @search = params[:search]
    @sales = Sale.where('first_name LIKE ?', @search).all
    @test = "test"
    # @company = Company.find(params[:id])
    # @search = params[:search]
    # @sales = Sale.where(first_name.include? @search).all
    # binding.pry
    # @test = "test"
    render json: @sales
  end

  def show
  end

  def new
  end

  def create
    @sale = Sale.new(sale_params)
    if @sale.save
      render json: @office
    else
    end
  end

  def edit
  end

  def update
    @sale = Sale.find(params[:id])
    if @sale.update(sale_params)
      render json: @sale
    end
  end

  private

  def sale_params
    params.require(:sale).permit(:first_name, :last_name, :kw, :sit_down, :close, :site_survey, :cancel, :date, :user_id, :office_id, :region_id, :company_id, :startday, :salesman, :search)
  end
end
