const competitions = (state = {}, action) => {
  switch(action.type) {
    case 'COMPETITIONS':
      return action.competitions
    case 'REMOVE_COMPETITION':
    let index = state.findIndex( s => s.id === action.competition.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'RESET_COMPETITIONS':
      return action.competitions = []
    default:
      return state;
  }
}

export default competitions;
