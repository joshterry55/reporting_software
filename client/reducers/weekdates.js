const weekdates = (state = {}, action) => {
  switch(action.type) {
    case 'WEEK_DATES':
      return action.weekDates
    default:
      return state;
  }
}

export default weekdates;
