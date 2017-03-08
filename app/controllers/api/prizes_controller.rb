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

  def add_avatar
    @prize = Prize.find(params[:id])
    u = Cloudinary::Uploader.upload(File.open(params[:avatar].tempfile))
   @prize.update(avatar: u['url'])
   render json: { avatar: u['url'] }
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
    render json: @prize
  end

  private

  def prize_params
    params.require(:prize).permit(:competition_id, :name, :rank, :avatar)
  end
end
