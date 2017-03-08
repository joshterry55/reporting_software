class Api::CompetitionGroupsController < ApplicationController
  def index
  end

  def show
    @competition = Competition.find(params[:id])
    @competition_groups = @competition.competition_groups
    render json: @competition_groups
  end

  def new
  end

  def add_avatar
    @group = CompetitionGroup.find(params[:id])
    u = Cloudinary::Uploader.upload(File.open(params[:avatar].tempfile))
   @group.update(avatar: u['url'])
   render json: { avatar: u['url'] }
  end

  def create
    @group = CompetitionGroup.new(competition_group_params)
    if @group.save
      render json: @group
    else
    end
  end

  def edit
  end

  def update
    @group = CompetitionGroup.find(params[:id])
    if @group.update(competition_group_params)
      render json: @group
    end
  end

  def destroy
    @group = CompetitionGroup.find(params[:id])
    @group.destroy
    render json: @group
  end

  private

  def competition_group_params
    params.require(:competition_group).permit(:competition_id, :name, :group_id, :avatar)
  end
end
