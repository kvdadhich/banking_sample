=begin
  Application Controller
  It manage application base functionality

  Banking Sample
  Created by Krishna Vyas.
=end


class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception


  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:fname, :lname, :address, :mobile_no])
    devise_parameter_sanitizer.permit(:account_update, keys: [:fname, :lname, :address, :mobile_no])
  end
end
