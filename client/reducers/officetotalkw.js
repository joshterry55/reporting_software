const officetotalkw = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_KW':
			return action.officeTotalKw
		default:
			return state;
	}
}

export default officetotalkw;
