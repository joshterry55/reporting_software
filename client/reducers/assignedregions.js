const assignedregions = (state = {}, action) => {
  switch(action.type) {
    case 'ASSIGNED_REGIONS':
      return action.regions
    case 'ADD_ASSIGNED_REGION':
      return [...state, action.region]
    default:
      return state;
  }
}

export default assignedregions;
