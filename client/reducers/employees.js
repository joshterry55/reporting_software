const employees = (state = {}, action) => {
  switch(action.type) {
    case 'EMPLOYEES':
      return action.users
    case 'ADD_EMPLOYEE':
      return [...state, action.employee]
    case 'RESET_EMPLOYEE':
      return action.users = []
    default:
      return state;
  }
}

export default employees;
