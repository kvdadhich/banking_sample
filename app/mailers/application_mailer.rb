class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'

  def transaction_alert(transaction)
    @transaction = transaction
    mail(to: transaction.user.email, subject: "Transaction Alert")
  end
end
