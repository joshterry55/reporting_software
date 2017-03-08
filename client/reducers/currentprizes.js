const currentprizes = (state = {}, action) => {
  switch(action.type) {
    case 'CURRENT_PRIZES':
      let prizes = action.prizes
      let sortedPrizes = prizes.sort(function(a, b) {
        return a.rank - b.rank;
      })
      return sortedPrizes
    case 'ADD_PRIZE':
      let addedPrizes =  [...state, action.prize]
      let sortedAddedPrizes = addedPrizes.sort(function(a, b) {
        return a.rank - b.rank;
      })
      return sortedAddedPrizes
    case 'REMOVE_CURRENT_PRIZES':
      return action.prizes = []
    default:
      return state;
  }
}

export default currentprizes;
