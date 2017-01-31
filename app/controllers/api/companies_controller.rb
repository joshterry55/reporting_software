class Api::CompaniesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @company = current_user.assigned_company
    render json: @company
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

  private

  def company_params
    params.require(:company).permit(:name)
  end
end
