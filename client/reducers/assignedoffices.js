const assignedoffices = (state = {}, action) => {
  switch(action.type) {
    case 'ASSIGNED_OFFICES':
      return action.offices
    case 'ADD_ASSIGNED_OFFICE':
      return [...state, action.office]
    default:
      return state;
  }
}

export default assignedoffices;
