const officetotalsitesurvey = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_SITE_SURVEY':
			return action.officeTotalSiteSurvey
    case 'RESET_SITE_SURVEY':
      return action.officeTotalSiteSurvey = {SS: 0}
		default:
			return state;
	}
}

export default officetotalsitesurvey;
