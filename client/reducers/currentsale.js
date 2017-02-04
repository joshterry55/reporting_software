const currentsale = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_SALE':
      return action.sale
    default:
      return state;
  }
}

export default currentsale;
