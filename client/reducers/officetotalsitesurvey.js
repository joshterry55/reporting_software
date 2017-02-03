const officetotalsitesurvey = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_SITE_SURVEY':
			return action.officeTotalSiteSurvey
		default:
			return state;
	}
}

export default officetotalsitesurvey;
