const leaderboarddate = (state = {}, action) => {
  switch(action.type) {
    case 'LEADERBOARD_DATE':
      return action.choice
    default:
      return state;
  }
}

export default leaderboarddate;
