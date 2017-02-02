const assignedregions = (state = {}, action) => {
  switch(action.type) {
    case 'ASSIGNED_REGIONS':
      return action.regions
    case 'ADD_ASSIGNED_REGION':
      return [...state, action.region]
    case 'UPDATE_ASSIGNED_REGION':
      let indexUpdate = state.findIndex( s => s.id === action.region.id)
      return [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.region
      ]
    case 'REMOVE_ASSIGNED_REGION':
      let index = state.findIndex( s => s.id === action.region.id)
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    default:
      return state;
  }
}

export default assignedregions;
