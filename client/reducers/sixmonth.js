const sixmonth = (state = [], action) => {
	switch(action.type) {
		case 'SIX_MONTH_AVERAGE':
			return action.sixMonthTotals
		case 'RESET_SIX_MONTH_AVERAGE':
			return action.sixMonthTotals = []
		default:
			return state;
	}
}

export default sixmonth;
