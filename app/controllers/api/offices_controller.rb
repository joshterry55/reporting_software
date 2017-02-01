class Api::OfficesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def show
  end

  def new
  end

  def create
    @office = Office.new(office_params)
    if @office.save
      current_user.assigned_offices << @office
      current_user.save
      render json: @office
    else
    end
  end

  def edit
  end

  private

  def office_params
    params.require(:office).permit(:name, :region_id)
  end
end
