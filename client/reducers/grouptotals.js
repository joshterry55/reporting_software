const grouptotals = (state = [], action) => {
	switch(action.type) {
		case 'GROUP_TOTALS':
			return action.groupArray
		case 'RESET_GROUP_TOTALS':
			return action.groupArray = []
		default:
			return state;
	}
}

export default grouptotals;
