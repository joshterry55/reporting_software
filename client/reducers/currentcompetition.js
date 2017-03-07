const currentcompetition = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_COMPETITION':
      return action.competition
    case 'REMOVE_CURRENT_COMPETITION':
      return action.competition = []
    default:
      return state;
  }
}

export default currentcompetition;
