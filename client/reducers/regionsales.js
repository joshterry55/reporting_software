
const regionsales = (state = [], action) => {
  switch(action.type) {
    case 'REGION_SALES':
      return action.sales
    case 'RESET_REGION_SALES':
      return action.sales = []
    default:
      return state;
  }
}

export default regionsales
