const currentregion = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_REGION':
      return action.region
    default:
      return state;
  }
}

export default currentregion;
