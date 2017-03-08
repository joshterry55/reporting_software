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

  def create
    @prize = Prize.new(prize_params)
    if @prize.save
      render json: @prize
    else
    end
  end

  def edit
  end

  def update
    @prize = Prize.find(params[:id])
    if @prize.update(prize_params)
      render json: @prize
    end
  end

  def destroy
    @prize = Prize.find(params[:id])
    @prize.destroy
  end

  private

  def prize_params
    params.require(:prize).permit(:competition_id, :name, :rank, :avatar)
  end
end
