module ApplicationHelper

	def dateFormet(date)
		return date.strftime('%d/%m/%Y %H:%M:%S')
	end


	def transaction_type(t_type)
		case t_type
		when 1
			return 'Debit'
		when 2
			return 'Credit'
		end
	end
end
