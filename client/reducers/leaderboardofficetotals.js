const leaderboardofficetotals = (state = [], action) => {
	switch(action.type) {
		case 'LEADERBOARD_OFFICE_TOTALS':
			return action.leaderboardArray
		case 'RESET_OFFICE_LEADERBOARD':
			return action.leaderboardArray = []
		default:
			return state;
	}
}

export default leaderboardofficetotals;
