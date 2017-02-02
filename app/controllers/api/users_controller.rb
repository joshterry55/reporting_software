class Api::UsersController < ApplicationController
  def info
    unless current_user
    render json: {}
    end
  end

  def index
    @office = Office.find(params[:id])
    @employees = @office.users
    render json: @employees
  end

  def employees
    @company = Company.find(params[:id])
    @employees = @company.users
    render json: @employees
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def new
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user
    else
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :role, :phone_number, :company_id, :region_id, :office_id)
  end

end
