const currentuser = (state = [], action) => {
  switch(action.type) {
    case 'CURRENT_USER':
      return action.user
    case 'UPDATE_USER_AVATAR':
      return action.current
    case 'RESET_CURRENT_USER':
      return action.user = []
    default:
      return state;
  }
}

export default currentuser
