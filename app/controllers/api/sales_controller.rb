class Api::SalesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def show
  end

  def new
  end

  def create
    @sale = Sale.new(sale_params)
    if @sale.save
      render json: @office
    else
    end
  end

  def edit
  end

  private

  def sale_params
    params.require(:sale).permit(:first_name, :last_name, :kw, :sit_down, :close, :site_survey, :cancel, :date, :user_id)
  end
end
