class Api::TrainingVideosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @company = Company.find(params[:id])
    @videos = @company.training_videos
    render json: @videos
  end

  def show
    @section = TrainingSection.find(params[:id])
    @videos = @section.training_videos
    render json: @videos
  end

  def new
  end

  def create
    @video = TrainingVideo.new(training_video_params)
    if @video.save
      render json: @video
    end
  end

  def edit
  end

  def update
    @video = TrainingVideo.find(params[:id])
    if @video.update(training_video_params)
      render json: @video
    end
  end

  def destroy
    @video = TrainingVideo.find(params[:id])
    @video.destroy
    render json: @video
  end

  private

  def training_video_params
    params.require(:training_video).permit(:name, :training_section_id, :link, :company_id)
  end
end
