class TransactionMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.transaction_mailer.transaction_alert.subject
  #
  def transaction_alert transaction
    @transaction = transaction
    mail to: "to@example.org", subject: "Transaction Alert"
  end
end
