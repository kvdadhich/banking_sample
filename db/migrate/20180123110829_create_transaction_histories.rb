class CreateTransactionHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :transaction_histories do |t|
      t.references :user, foreign_key: true
      t.text :desc
      t.float :amount
      t.integer :trans_type

      t.timestamps
    end
  end
end
