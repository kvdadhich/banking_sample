=begin
  Transaction Histoy Controller for Manager
  It manage application Transaction Histoy functionality

  Banking Sample
  Created by Krishna Vyas.
=end


class Manager::TransactionHistoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :check_permission
  
  respond_to :html, :xls, :csv
  # GET /transaction_histories
  # GET /transaction_histories.json
  def index
    @transaction_histories = TransactionHistory.all
    if !params[:type].nil? && params[:type] != ""
      @transaction_histories = @transaction_histories.where(trans_type: params[:type].to_i)
    end
    if !params[:user].nil? && params[:user] != ""
      user_ids = User.where("lower(concat(fname,' ',lname)) like (?)","%#{params[:user].downcase}%").map(&:id)
      @transaction_histories = @transaction_histories.where(user_id: user_ids)
    end
    if !params[:date_range].nil? && params[:date_range] != ""
      date = params[:date_range].split(' - ') 
      sdate = date[0].to_datetime
      edate = date[1].to_datetime
      @transaction_histories = @transaction_histories.where(created_at: sdate.beginning_of_day..edate.beginning_of_day)
    end
    respond_to do |format|
      format.html{@transaction_histories = @transaction_histories.paginate(:page => params[:page], :per_page =>25)}
      format.csv { send_data TransactionHistory.to_csv({},@transaction_histories) }
      format.xls  { send_data TransactionHistory.to_csv({col_sep: "\t"},@transaction_histories) }
    end
  end

  

  private

    # for check manager permission
    def check_permission
      unless current_user.is_admin == 1
        redirect_to "/", warning: "You don't have permission to access that page."
      end
    end
end
