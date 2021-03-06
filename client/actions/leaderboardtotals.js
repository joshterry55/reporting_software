export const leaderboardtotals = (currentSales) => {
  return(dispatch) => {

    let leaderboardTotals = {}
    // let leaderboard = {3: {name: 'josh', id: 5, kw: 7}, 5: {a;lskdf;lasjdfl}, 8: {name: 'josh', kw: 6, sd: 1} }

  	currentSales.map(sale => {
      if(sale.user_id in leaderboardTotals) {
          leaderboardTotals[sale.user_id].kw += parseFloat(sale.kw)
          leaderboardTotals[sale.user_id].sit_down += parseFloat(sale.sit_down)
          leaderboardTotals[sale.user_id].close += parseFloat(sale.close)
          leaderboardTotals[sale.user_id].site_survey += parseFloat(sale.site_survey)
          leaderboardTotals[sale.user_id].cancel += parseFloat(sale.cancel)
          if(parseFloat(sale.site_survey) != 0) {
            leaderboardTotals[sale.user_id].site_survey_kw += parseFloat(sale.kw)
          }
      } else {
        leaderboardTotals[sale.user_id] = {}
        leaderboardTotals[sale.user_id].name = sale.salesman
        leaderboardTotals[sale.user_id].id = sale.user_id
        leaderboardTotals[sale.user_id].kw = parseFloat(sale.kw)
        leaderboardTotals[sale.user_id].sit_down = parseFloat(sale.sit_down)
        leaderboardTotals[sale.user_id].close = parseFloat(sale.close)
        leaderboardTotals[sale.user_id].site_survey = parseFloat(sale.site_survey)
        leaderboardTotals[sale.user_id].cancel = parseFloat(sale.cancel)
        if(parseFloat(sale.site_survey) != 0) {
          leaderboardTotals[sale.user_id].site_survey_kw = parseFloat(sale.kw)
        } else {
          leaderboardTotals[sale.user_id].site_survey_kw = 0
        }
      }
  	})

    let newArray = []

    for (var key in leaderboardTotals) {
      newArray.push(leaderboardTotals[key]);
    }

    let leaderboardArray = newArray.sort(function(a, b) {
      return b.kw - a.kw;
    });

    dispatch({type: 'LEADERBOARD_TOTALS', leaderboardArray})

  }
}

export const leaderboardtotalssite = (currentSales) => {
  return(dispatch) => {

    let leaderboardTotals = {}
    // let leaderboard = {3: {name: 'josh', id: 5, kw: 7}, 5: {a;lskdf;lasjdfl}, 8: {name: 'josh', kw: 6, sd: 1} }

  	currentSales.map(sale => {
      if(sale.user_id in leaderboardTotals) {
          leaderboardTotals[sale.user_id].kw += parseFloat(sale.kw)
          leaderboardTotals[sale.user_id].sit_down += parseFloat(sale.sit_down)
          leaderboardTotals[sale.user_id].close += parseFloat(sale.close)
          leaderboardTotals[sale.user_id].site_survey += parseFloat(sale.site_survey)
          leaderboardTotals[sale.user_id].cancel += parseFloat(sale.cancel)
          if(parseFloat(sale.site_survey) != 0) {
            leaderboardTotals[sale.user_id].site_survey_kw += parseFloat(sale.kw)
          }
      } else {
        leaderboardTotals[sale.user_id] = {}
        leaderboardTotals[sale.user_id].name = sale.salesman
        leaderboardTotals[sale.user_id].id = sale.user_id
        leaderboardTotals[sale.user_id].kw = parseFloat(sale.kw)
        leaderboardTotals[sale.user_id].sit_down = parseFloat(sale.sit_down)
        leaderboardTotals[sale.user_id].close = parseFloat(sale.close)
        leaderboardTotals[sale.user_id].site_survey = parseFloat(sale.site_survey)
        leaderboardTotals[sale.user_id].cancel = parseFloat(sale.cancel)
        if(parseFloat(sale.site_survey) != 0) {
          leaderboardTotals[sale.user_id].site_survey_kw = parseFloat(sale.kw)
        } else {
          leaderboardTotals[sale.user_id].site_survey_kw = 0
        }
      }
  	})

    let newArray = []

    for (var key in leaderboardTotals) {
      newArray.push(leaderboardTotals[key]);
    }

    let leaderboardArray = newArray.sort(function(a, b) {
      return b.site_survey - a.site_survey;
    });

    dispatch({type: 'LEADERBOARD_TOTALS', leaderboardArray})

  }
}

export const leaderboardtotalssitekw = (currentSales) => {
  return(dispatch) => {

    let leaderboardTotals = {}
    // let leaderboard = {3: {name: 'josh', id: 5, kw: 7}, 5: {a;lskdf;lasjdfl}, 8: {name: 'josh', kw: 6, sd: 1} }

  	currentSales.map(sale => {
      if(sale.user_id in leaderboardTotals) {
          leaderboardTotals[sale.user_id].kw += parseFloat(sale.kw)
          leaderboardTotals[sale.user_id].sit_down += parseFloat(sale.sit_down)
          leaderboardTotals[sale.user_id].close += parseFloat(sale.close)
          leaderboardTotals[sale.user_id].site_survey += parseFloat(sale.site_survey)
          leaderboardTotals[sale.user_id].cancel += parseFloat(sale.cancel)
          if(parseFloat(sale.site_survey) != 0) {
            leaderboardTotals[sale.user_id].site_survey_kw += parseFloat(sale.kw)
          }
      } else {
        leaderboardTotals[sale.user_id] = {}
        leaderboardTotals[sale.user_id].name = sale.salesman
        leaderboardTotals[sale.user_id].id = sale.user_id
        leaderboardTotals[sale.user_id].kw = parseFloat(sale.kw)
        leaderboardTotals[sale.user_id].sit_down = parseFloat(sale.sit_down)
        leaderboardTotals[sale.user_id].close = parseFloat(sale.close)
        leaderboardTotals[sale.user_id].site_survey = parseFloat(sale.site_survey)
        leaderboardTotals[sale.user_id].cancel = parseFloat(sale.cancel)
        if(parseFloat(sale.site_survey) != 0) {
          leaderboardTotals[sale.user_id].site_survey_kw = parseFloat(sale.kw)
        } else {
          leaderboardTotals[sale.user_id].site_survey_kw = 0
        }
      }
  	})

    let newArray = []

    for (var key in leaderboardTotals) {
      newArray.push(leaderboardTotals[key]);
    }

    let leaderboardArray = newArray.sort(function(a, b) {
      return b.site_survey_kw - a.site_survey_kw;
    });

    dispatch({type: 'LEADERBOARD_TOTALS', leaderboardArray})

  }
}
