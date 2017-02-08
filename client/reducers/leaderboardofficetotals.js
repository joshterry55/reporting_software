const leaderboardofficetotals = (state = [], action) => {
	switch(action.type) {
		case 'LEADERBOARD_OFFICE_TOTALS':
			return action.leaderboardArray
		case 'RESET_OFFICE_LEADERBOARD':
			return action.leaderboardArray = [{name: '', id: 0, kw: 0, sit_down: 0, close: 0, site_survey: 0, cancel: 0}]
		default:
			return state;
	}
}

export default leaderboardofficetotals;
