
const officesales = (state = {}, action) => {
  switch(action.type) {
    case 'OFFICE_SALES':
      return action.sales
    case 'UPDATE_OFFICE_SALES':
    let indexUpdate = state.findIndex( s => s.id === action.sale.id)
      return [
      ...state.slice(0, indexUpdate),
      ...state.slice(indexUpdate + 1),
      action.sale
      ]
    default:
      return state;
  }
}

export default officesales
