class Api::CompetitionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def active
    @company = Company.find(params[:id])
    @competitions = @company.competitions.where('start_date < ? AND end_date > ?', Time.now.in_time_zone('Mountain Time (US & Canada)'), Time.now.in_time_zone('Mountain Time (US & Canada)'))
    render json: @competitions
  end

  def not_started
    @company = Company.find(params[:id])
    @competitions = @company.competitions.where('start_date > ?', Time.now.in_time_zone('Mountain Time (US & Canada)'))
    render json: @competitions
  end

  def completed
    @company = Company.find(params[:id])
    @competitions = @company.competitions.where('end_date < ?', Time.now.in_time_zone('Mountain Time (US & Canada)'))
    render json: @competitions
  end

  def show
    @competition = Competition.find(params[:id])
    render json: @competition
  end

  def new
  end

  def create
    @competition = Competition.new(competition_params)
    if @competition.save
      render json: @competition
    else
    end
  end

  def edit
  end

  def update
    @competition = Competition.find(params[:id])
    if @competition.update(competition_params)
      render json: @competition
    end
  end

  def destroy
    @competition = Competition.find(params[:id])
    @competition.destroy
    render json: @competition
  end

  private

  def competition_params
    params.require(:competition).permit(:company_id, :name, :start_date, :end_date, :competition_type, :grouped_by)
  end
end
