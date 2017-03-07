const currentgroups = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_GROUPS':
      return action.groups
    case 'REMOVE_CURRENT_GROUPS':
      return action.groups = []
    default:
      return state;
  }
}

export default currentgroups;
