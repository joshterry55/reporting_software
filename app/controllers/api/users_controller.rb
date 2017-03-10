class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

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
    # render json: @employees
  end

  def competition_employees
    @company = Company.find(params[:id])
    @selection = params[:selection]
    @groups = params[:groups]
    if(@selection == 'office')
      @employees = @company.users.where(office_id: @groups)
    elsif @selection == 'region'
      @employees = @company.users.where(region_id: @groups)
    else
      @employees = @company.users
    end
    # render json: @employees
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def new
  end

  def add_avatar
    u = Cloudinary::Uploader.upload(File.open(params[:avatar].tempfile))
   current_user.update(avatar: u['url'])
   render json: { avatar: u['url'] }
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
    params.require(:user).permit(:first_name, :last_name, :role, :phone_number, :company_id, :region_id, :office_id, :avatar, :groups, :selection)
  end

end
