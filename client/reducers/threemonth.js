const threemonth = (state = [], action) => {
	switch(action.type) {
		case 'THREE_MONTH_AVERAGE':
			return action.threeMonthTotals
		case 'RESET_THREE_MONTH_AVERAGE':
			return action.threeMonthTotals = []
		default:
			return state;
	}
}

export default threemonth;
