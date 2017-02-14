class Api::TrainingSectionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @company = Company.find(params[:id])
    @sections = @company.training_sections
    render json: @sections
  end

  def show
    @category = TrainingCategory.find(params[:id])
    @sections = @category.training_sections
    render json: @sections
  end

  def new
  end

  def create
    @section = TrainingSection.new(training_section_params)
    if @section.save
      render json: @section
    end
  end

  def edit
  end

  def update
    @section = TrainingSection.find(params[:id])
    if @section.update(training_section_params)
      render json: @section
    end
  end

  def add_avatar
    @section = TrainingSection.find(params[:id])
    u = Cloudinary::Uploader.upload(File.open(params[:avatar].tempfile))
   @section.update(avatar: u['url'])
   render json: { avatar: u['url'] }
  end


  def destroy
    @section = TrainingSection.find(params[:id])
    @section.destroy
    render json: @section
  end

  private

  def training_section_params
    params.require(:training_section).permit(:name, :training_category_id, :avatar, :company_id)
  end
end
