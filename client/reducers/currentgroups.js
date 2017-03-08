const currentgroups = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_GROUPS':
      let allGroups = action.groups
      let sortedGroups = allGroups.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedGroups
    case 'ADD_GROUP':
      let addedGroups = [...state, action.group]
      let sortedAddedGroups = addedGroups.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedAddedGroups
    case 'UPDATE_CURRENT_GROUPS':
      let indexUpdate = state.findIndex( s => s.id === action.group.id)
      let updatedGroups = [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.group
      ]
      let sortedUpdatedGroups = updatedGroups.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedUpdatedGroups
    case 'REMOVE_GROUP':
    let index = state.findIndex( s => s.id === action.group.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'REMOVE_CURRENT_GROUPS':
      return action.groups = []
    default:
      return state;
  }
}

export default currentgroups;
