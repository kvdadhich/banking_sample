require 'test_helper'

class TransactionHistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @transaction_history = transaction_histories(:one)
  end

  test "should get index" do
    get transaction_histories_url
    assert_response :success
  end

  test "should get new" do
    get new_transaction_history_url
    assert_response :success
  end

  test "should create transaction_history" do
    assert_difference('TransactionHistory.count') do
      post transaction_histories_url, params: { transaction_history: { amount: @transaction_history.amount, desc: @transaction_history.desc, trans_type: @transaction_history.trans_type, user_id: @transaction_history.user_id } }
    end

    assert_redirected_to transaction_history_url(TransactionHistory.last)
  end

  test "should show transaction_history" do
    get transaction_history_url(@transaction_history)
    assert_response :success
  end

  test "should get edit" do
    get edit_transaction_history_url(@transaction_history)
    assert_response :success
  end

  test "should update transaction_history" do
    patch transaction_history_url(@transaction_history), params: { transaction_history: { amount: @transaction_history.amount, desc: @transaction_history.desc, trans_type: @transaction_history.trans_type, user_id: @transaction_history.user_id } }
    assert_redirected_to transaction_history_url(@transaction_history)
  end

  test "should destroy transaction_history" do
    assert_difference('TransactionHistory.count', -1) do
      delete transaction_history_url(@transaction_history)
    end

    assert_redirected_to transaction_histories_url
  end
end
