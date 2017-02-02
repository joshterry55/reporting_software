const employees = (state = {}, action) => {
  switch(action.type) {
    case 'EMPLOYEES':
      return action.users
    case 'ADD_EMPLOYEE':
      return [...state, action.employee]  
    default:
      return state;
  }
}

export default employees;
