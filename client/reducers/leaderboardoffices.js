const leaderboardoffices = (state = {}, action) => {
  switch(action.type) {
    case 'LEADERBOARD_OFFICES':
      return action.offices
    case 'RESET_LEADERBOARD_OFFICE':
      return action.office = []
    default:
      return state;
  }
}

export default leaderboardoffices;
