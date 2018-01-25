json.extract! transaction_history, :id, :user_id, :desc, :amount, :trans_type, :created_at, :updated_at
json.url transaction_history_url(transaction_history, format: :json)
