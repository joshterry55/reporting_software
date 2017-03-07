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

  def edit
  end
end
