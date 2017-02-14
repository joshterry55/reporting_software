const currentsection = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_SECTION':
      return action.section
    case 'REMOVE_CURRENT_SECTION':
      return action.section = []
    default:
      return state;
  }
}

export default currentsection;
