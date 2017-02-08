const leaderboardregiontotals = (state = [], action) => {
	switch(action.type) {
		case 'LEADERBOARD_REGION_TOTALS':
			return action.leaderboardArray
		case 'RESET_REGION_LEADERBOARD':
			return action.leaderboardArray = []
		default:
			return state;
	}
}

export default leaderboardregiontotals;
