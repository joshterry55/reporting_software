class Api::RegionsController < ApplicationController
  def index
    @company_id = params[:company_id]
    @regions = Region.where(company_id: @company_id)
    render json: @regions
  end

  def new
  end

  def create
    @region = Region.new(region_params)
    if @region.save
      current_user.assigned_regions << @region
      current_user.save
      render json: @region
    else
    end
  end

  def edit
  end

  def show
  end

  private

  def region_params
    params.require(:region).permit(:name, :company_id)
  end
end
