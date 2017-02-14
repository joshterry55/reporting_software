
const trainingvideos = (state = [], action) => {
  switch(action.type) {
    case 'TRAINING_VIDEOS':
      return action.videos
    case 'ADD_TRAINING_VIDEO':
      return [...state, action.video]
    case 'UPDATE_TRAINING_VIDEO':
      let indexUpdate = state.findIndex( s => s.id === action.video.id)
      return [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.video
      ]
    case 'REMOVE_TRAINING_VIDEO':
    let index = state.findIndex( s => s.id === action.video.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'RESET_TRAINING_VIDEOS':
      return action.videos = []
    default:
      return state;
  }
}

export default trainingvideos
