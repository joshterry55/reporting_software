const competitiontotals = (state = [], action) => {
	switch(action.type) {
		case 'COMPETITION_TOTALS':
			return action.competitionArray
		case 'RESET_COMPETITION_TOTALS':
			return action.competitionArray = []
		default:
			return state;
	}
}

export default competitiontotals;
