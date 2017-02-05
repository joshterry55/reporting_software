const officetotalsitdown = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_SIT_DOWN':
			return action.officeTotalSitDown
    case 'RESET_SIT_DOWN':
      return action.officeTotalSitDown = {SD: 0}
		default:
			return state;
	}
}

export default officetotalsitdown;
