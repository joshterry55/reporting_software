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
      return [...state, action.employee]
    case 'RESET_EMPLOYEE':
      return action.users = []
    default:
      return state;
  }
}

export default employees;
