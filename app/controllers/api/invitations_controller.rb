class Api::InvitationsController < Devise::InvitationsController
  skip_before_action :verify_authenticity_token
  clear_respond_to
  respond_to :json

  def create
    new_user_id = JSON.parse(super)['id']
    user = User.find(new_user_id)
    binding.pry
    user.company = Company.find(params[:company_id])
    user.region = Region.find(params[:region_id])
    user.office = Office.find(params[:office_id])
    user.assigned_company << user.company
    user.assigned_regions << user.region
    user.assigned_offices << user.office 
    user.save
  end


  def update
    raw_invitation_token = update_resource_params[:invitation_token]
    self.resource = accept_resource
    invitation_accepted = resource.errors.empty?

    yield resource if block_given?

    if invitation_accepted
      sign_in(resource_name, resource)
      redirect_to '/'
    else
      resource.invitation_token = raw_invitation_token
      respond_with_navigational(resource){ render :edit }
    end
  end

  private
    def invite_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end
end
