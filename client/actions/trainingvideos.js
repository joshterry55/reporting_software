export const trainingvideos = (videos) => {
  return(dispatch) => {

    let sortedVideos = videos.sort(function(a, b){
      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    })

    dispatch({type: 'TRAINING_VIDEOS', sortedVideos})

  }
}
