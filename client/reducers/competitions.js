const competitions = (state = {}, action) => {
  switch(action.type) {
    case 'COMPETITIONS':
      return action.competitions
    case 'REMOVE_COMPETITIONS':
      return action.competitions = []
    default:
      return state;
  }
}

export default competitions;
