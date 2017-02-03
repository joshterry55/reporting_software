const officetotalsitdown = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_SIT_DOWN':
			return action.officeTotalSitDown
		default:
			return state;
	}
}

export default officetotalsitdown;
