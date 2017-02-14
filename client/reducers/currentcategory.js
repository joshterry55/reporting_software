const currentcategory = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_CATEGORY':
      return action.category
    case 'REMOVE_CURRENT_CATEGORY':
      return action.category = []
    default:
      return state;
  }
}

export default currentcategory;
