const officetotalclose = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_CLOSE':
			return action.officeTotalClose
    case 'RESET_CLOSE':
      return action.officeTotalClose = {CL: 0}
		default:
			return state;
	}
}

export default officetotalclose;
