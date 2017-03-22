const saleswage = (state = [], action) => {
	switch(action.type) {
		case 'SALES_WAGE':
			return action.salesWage
		case 'RESET_SALES_WAGE':
			return action.salesWage = []
		default:
			return state;
	}
}

export default saleswage;
