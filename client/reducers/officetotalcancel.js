const officetotalcancel = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_CANCEL':
			return action.officeTotalCancel
		case 'RESET_CANCEL':
			return action.officeTotalCancel = {CA: 0}
		default:
			return state;
	}
}

export default officetotalcancel;
