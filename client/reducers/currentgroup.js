const currentgroup = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_GROUP':
      return action.group
    case 'REMOVE_CURRENT_GROUP':
      return action.group = []
    default:
      return state;
  }
}

export default currentgroup;
