require 'test_helper'

class TransactionMailerTest < ActionMailer::TestCase
  test "transaction_alert" do
    mail = TransactionMailer.transaction_alert
    assert_equal "Transaction alert", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
