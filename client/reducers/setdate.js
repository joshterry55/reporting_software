const setdate = (state = {}, action) => {
	let today = new Date()
	switch(action.type) {
		case "SET_DATE":
			let numberOfDay = today.getDay();
			return numberOfDay;
		case "SET_WEEK":
				let number2 = today.getDay();
				let numberOfDay2 = (number2 + (7 * action.weekOffset))
				return numberOfDay2;
		default:
			return state;
	}
}

export default setdate;
