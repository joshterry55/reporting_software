const assignedcompany = (state = {}, action) => {
  switch(action.type) {
    case 'ASSIGNED_COMPANY':
      return action.company
    case 'ADD_ASSIGNED_COMPANY':
      return [...state, action.company]
    case 'RESET_ASSIGNED_COMPANY':
      return action.company = []
    default:
      return state;
  }
}

export default assignedcompany;
