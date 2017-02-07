const leaderboardtotals = (state = [], action) => {
	switch(action.type) {
		case 'LEADERBOARD_TOTALS':
			return action.leaderboardArray
		case 'RESET_LEADERBOARD':
			return action.leaderboardArray = {}
		default:
			return state;
	}
}

export default leaderboardtotals;
