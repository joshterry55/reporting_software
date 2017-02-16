
const trainingvideos = (state = [], action) => {
  switch(action.type) {
    case 'TRAINING_VIDEOS':
      return action.sortedVideos
    case 'ADD_TRAINING_VIDEO':
      let added = [...state, action.video]
      let sortedAddedVideos = added.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedAddedVideos

    case 'UPDATE_TRAINING_VIDEO':
      let indexUpdate = state.findIndex( s => s.id === action.video.id)
      let sliced = [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.video
      ]
      let sortedVideos = sliced.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedVideos

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
