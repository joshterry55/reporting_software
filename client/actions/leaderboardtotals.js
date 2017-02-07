export const leaderboardtotals = (currentSales) => {
  return(dispatch) => {

    let leaderboardTotals = {}
    // let leaderboard = {3: {name: 'josh', id: 5, kw: 7}, 5: {a;lskdf;lasjdfl}, 8: {name: 'josh', kw: 6, sd: 1} }
    debugger

  	currentSales.map(sale => {
      if(sale.user_id in leaderboardTotals) {
          leaderboardTotals[sale.user_id].kw += parseFloat(sale.kw)
          leaderboardTotals[sale.user_id].sit_down += parseFloat(sale.sit_down)
          leaderboardTotals[sale.user_id].close += parseFloat(sale.close)
          leaderboardTotals[sale.user_id].site_survey += parseFloat(sale.site_survey)
          leaderboardTotals[sale.user_id].cancel += parseFloat(sale.cancel)
      } else {
        leaderboardTotals[sale.user_id] = {}
        leaderboardTotals[sale.user_id].name = sale.user_id
        leaderboardTotals[sale.user_id].kw = parseFloat(sale.kw)
        leaderboardTotals[sale.user_id].sit_down = parseFloat(sale.sit_down)
        leaderboardTotals[sale.user_id].close = parseFloat(sale.close)
        leaderboardTotals[sale.user_id].site_survey = parseFloat(sale.site_survey)
        leaderboardTotals[sale.user_id].cancel = parseFloat(sale.cancel)
      }
  	})

    let newArray = []

    for (var key in leaderboardTotals) {
      newArray.push(leaderboardTotals[key]);
    }

    let leaderboardArray = newArray.sort(function(a, b) {
      return a.kw - b.kw;
    });

    dispatch({type: 'LEADERBOARD_TOTALS', leaderboardArray})

  }
}
