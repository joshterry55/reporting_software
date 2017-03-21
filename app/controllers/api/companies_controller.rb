class Api::CompaniesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    # @company = current_user.assigned_company[0]
    # binding.pry
    # render json: @company
    @company = current_user.assigned_company[0]
    company_id = @company['id']
    @current_company = Company.find(company_id)
    render json: @current_company
  end

  def regions
    @company = Company.find(params[:id])
    @regions = @company.regions
    render json: @regions

  end

  def offices
    @company = Company.find(params[:id])
    @offices = @company.offices
    render json: @offices

  end

  def show
  end

  def new
  end

  def create
    @company = Company.new(company_params)
    if @company.save
      current_user.assigned_company << @company
      current_user.save
      render json: @company
    else
    end
  end

  def edit
  end

  def update
    @company = Company.find(params[:id])
    if @company.update(company_params)
      current_user.assigned_company = []
      current_user.assigned_company << @company
      current_user.save
      render json: @company
    else
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :avatar, :true_percentage, :cancel_percentage, :color, :lifetime_kw, :accent_color, :color_text, :accent_text)
  end
end
