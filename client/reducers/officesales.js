
const officesales = (state = {}, action) => {
  switch(action.type) {
    case 'OFFICE_SALES':
      return action.sales
    default:
      return state;
  }
}

export default officesales
