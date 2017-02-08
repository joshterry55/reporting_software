
const officesales = (state = [], action) => {
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
    case 'REMOVE_OFFICE_SALE':
    let index = state.findIndex( s => s.id === action.sale.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'RESET_OFFICE_SALES':
      return action.sales = []
    default:
      return state;
  }
}

export default officesales
