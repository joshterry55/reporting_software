const officetotalkw = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_KW':
			return action.officeTotalKw
		case 'RESET_KW':
			return action.officeTotalKw = {KW: 0}
		default:
			return state;
	}
}

export default officetotalkw;
