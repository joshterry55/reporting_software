const currentoffice = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_OFFICE':
      return action.office
    case 'REMOVE_CURRENT_OFFICE':
      return action.office = []
    default:
      return state;
  }
}

export default currentoffice;
