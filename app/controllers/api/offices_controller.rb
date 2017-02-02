class Api::OfficesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @offices = current_user.assigned_offices
    render json: @offices
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

  def update
    @office = Office.find(params[:id])
    if @office.update(office_params)
      current_user.assigned_offices.each do |o|
        if o['id'] == @office.id
          current_user.assigned_offices.delete(o)
          current_user.assigned_offices << @office
          current_user.assigned_offices.flatten
          current_user.save
        end
      end
      render json: @office
    else
    end
  end

  def destroy
    @office = Office.find(params[:id])
    current_user.assigned_offices.each do |o|
      if o['id'] == @office.id
        current_user.assigned_offices.delete(o)
        current_user.save
      end
    end
    @office.destroy
    render json: @office
  end

  private

  def office_params
    params.require(:office).permit(:name, :region_id)
  end
end
