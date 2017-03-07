class Api::PrizesController < ApplicationController
  def index
  end

  def show
    @competition = Competition.find(params[:id])
    @prizes = @competition.prizes
    render json: @prizes
  end

  def new
  end

  def edit
  end
end
