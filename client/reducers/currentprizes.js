const currentprizes = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_PRIZES':
      return action.prizes
    case 'REMOVE_CURRENT_PRIZES':
      return action.prizes = []
    default:
      return state;
  }
}

export default currentprizes;
