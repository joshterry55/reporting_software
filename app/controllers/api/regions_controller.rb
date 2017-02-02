class Api::RegionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @regions = current_user.assigned_regions
    # @company_id = params[:company_id]
    # @regions = Region.where(company_id: @company_id)
    render json: @regions
  end

  def show
    @region = Region.find(params[:id])
    render json: @region
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

  def update
    @region = Region.find(params[:id])
    if @region.update(region_params)
      current_user.assigned_regions.each do |r|
        if r['id'] == @region.id
          current_user.assigned_regions.delete(r)
          current_user.assigned_regions << @region
          current_user.save
        end
      end
      render json: @region
    else
    end
  end

  def destroy
    @region = Region.find(params[:id])
    current_user.assigned_regions.each do |r|
      if r['id'] == @region.id
        current_user.assigned_regions.delete(r)
        current_user.save
      end
    end
    current_user.assigned_offices.each do |o|
      if o['region_id'] == @region.id
        current_user.assigned_offices.delete(o)
      end
      current_user.save
    end
    @region.destroy
    render json: @region
  end

  private

  def region_params
    params.require(:region).permit(:name, :company_id)
  end
end
