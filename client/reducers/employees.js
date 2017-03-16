const employees = (state = {}, action) => {
  switch(action.type) {
    case 'EMPLOYEES':
      let allEmployees = action.users
      let sortedEmployees = allEmployees.sort(function(a, b){
        if(a.first_name.toLowerCase() < b.first_name.toLowerCase()) return -1;
        if(a.first_name.toLowerCase() > b.first_name.toLowerCase()) return 1;
        return 0;
      })
      return sortedEmployees
    case 'ADD_EMPLOYEE':
      let addedEmployees = [...state, action.employee]
      let sortedAddedEmployees = addedEmployees.sort(function(a, b){
        if(a.first_name.toLowerCase() < b.first_name.toLowerCase()) return -1;
        if(a.first_name.toLowerCase() > b.first_name.toLowerCase()) return 1;
        return 0;
      })

      return sortedAddedEmployees

    case 'UPDATE_EMPLOYEE':
      let indexUpdate = state.findIndex( s => s.id === action.user.id)
      let updatedUsers = [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.user
      ]
      let updatedSortedEmployees = updatedUsers.sort(function(a, b){
        if(a.first_name.toLowerCase() < b.first_name.toLowerCase()) return -1;
        if(a.first_name.toLowerCase() > b.first_name.toLowerCase()) return 1;
        return 0;
      })
      return updatedSortedEmployees
    case 'REMOVE_EMPLOYEE':
    let index = state.findIndex( s => s.id === action.user.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'RESET_EMPLOYEE':
      return action.users = []
    default:
      return state;
  }
}

export default employees;
