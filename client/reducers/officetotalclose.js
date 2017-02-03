const officetotalclose = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_CLOSE':
			return action.officeTotalClose
		default:
			return state;
	}
}

export default officetotalclose;
