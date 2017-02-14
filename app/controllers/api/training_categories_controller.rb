class Api::TrainingCategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def show
    @company = Company.find(params[:id])
    @categories = @company.training_categories
    render json: @categories
  end

  def new
  end

  def create
    @category = TrainingCategory.new(training_category_params)
    if @category.save
      render json: @category
    end
  end

  def edit
  end

  def update
    @category = TrainingCategory.find(params[:id])
    if @category.update(training_category_params)
      render json: @category
    end
  end


  def destroy
    @category = TrainingCategory.find(params[:id])
    @category.destroy
    render json: @category
  end

  private

  def training_category_params
    params.require(:training_category).permit(:name, :company_id)
  end
end
