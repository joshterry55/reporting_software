class Api::CompaniesController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def create
    @company = Company.new(company_params)
    if @company.save
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
