const officetotalcancel = (state = [], action) => {
	switch(action.type) {
		case 'TOTAL_CANCEL':
			return action.officeTotalCancel
		default:
			return state;
	}
}

export default officetotalcancel;
