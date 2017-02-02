const assignedoffices = (state = {}, action) => {
  switch(action.type) {
    case 'ASSIGNED_OFFICES':
      return action.offices
    case 'ADD_ASSIGNED_OFFICE':
      return [...state, action.office]
    case 'UPDATE_ASSIGNED_OFFICE':
      let indexUpdate = state.findIndex( s => s.id === action.office.id)
      return [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.office
      ]
    case 'REMOVE_ASSIGNED_OFFICE':
      let index = state.findIndex( s => s.id === action.office.id)
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    default:
      return state;
  }
}

export default assignedoffices;
