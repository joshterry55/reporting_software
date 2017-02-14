const currentvideo = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_VIDEO':
      return action.video
    case 'REMOVE_CURRENT_VIDEO':
      return action.video = []
    default:
      return state;
  }
}

export default currentvideo;
