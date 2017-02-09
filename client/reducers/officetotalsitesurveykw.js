const officetotalsitesurveykw = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_SITE_SURVEY_KW':
			return action.officeTotalSiteSurveyKw
    case 'RESET_SITE_SURVEY_KW':
      return action.officeTotalSiteSurveyKw = {SSKW: 0}
		default:
			return state;
	}
}

export default officetotalsitesurveykw;
