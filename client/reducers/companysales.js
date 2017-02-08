
const companysales = (state = {}, action) => {
  switch(action.type) {
    case 'COMPANY_SALES':
      return action.sales
    case 'RESET_COMPANY_SALES':
      return action.sales = []
    default:
      return state;
  }
}

export default companysales
