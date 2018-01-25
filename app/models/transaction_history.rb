class TransactionHistory < ApplicationRecord
  belongs_to :user

  validates_presence_of :user, :desc, :amount, :trans_type
  validates :amount, only_integer: true
  validates :current_balance

  after_create :update_balance, :send_transaction_alert

  def current_balance
    return true if self.user.balance > self.amount
    errors.add(:amount, "You don't have suffuicient balance to perform this transaction")
  end

  def update_balance
    user = self.user
    self.trans_type == 1 ? user.balance -= self.amount :
                            user.balance += self.amount
    user.save
  end

  # for export csv or xls
  def self.to_csv(options = {},histories)
    CSV.generate(options) do |csv|
      users = ['fname', 'lname', 'email', 'address', 'mobile_no']
      transactions = ['amount', 'desc']
      trans_type = ['transaction_type']
      csv.add_row users + transactions + trans_type
      # csv << column_names
      histories.each do |h|
        row = h.user.attributes.values_at(*users)
        row += h.attributes.values_at(*transactions)
        row += [h.get_trans_type(h.trans_type)]
        csv.add_row row
      end
    end
  end

  def get_trans_type(t_type)
  	case t_type
		when 1
			return 'Debit'
		when 2
			return 'Credit'
		end
  end

  # for send transaction alert
  def send_transaction_alert
    ApplicationMailer.transaction_alert(self).deliver_now
  end
end
