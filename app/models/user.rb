class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :fname, :lname, :is_admin, :balance, :address, :mobile_no
  validates :mobile_no, numericality: { only_integer: true }

  has_many :transaction_histories
end
