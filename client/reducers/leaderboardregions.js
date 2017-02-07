const leaderboardregions = (state = {}, action) => {
  switch(action.type) {
    case 'LEADERBOARD_REGIONS':
      return action.regions
    case 'RESET_LEADERBOARD_REGION':
      return action.region = []
    default:
      return state;
  }
}

export default leaderboardregions;
