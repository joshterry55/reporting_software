const currentfilter = (state = [], action) => {
  switch(action.type) {
    case 'CURRENT_FILTER':
      return action.choice
    case 'RESET_CURRENT_FILTER':
      return action.choice = []
    default:
      return state;
  }
}

export default currentfilter;
