const currentprize = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_PRIZE':
      return action.prize
    case 'REMOVE_CURRENT_PRIZE':
      return action.prize = []
    default:
      return state;
  }
}

export default currentprize;
