const lifetimekw = (state = [], action) => {
	switch(action.type) {
		case 'LIFETIME_KW':
			return action.LifetimeSiteSurveyKw
    case 'RESET_LIFETIME_KW':
      return action.LifetimeSiteSurveyKw = {SSKW: 0}
		default:
			return state;
	}
}

export default lifetimekw;
