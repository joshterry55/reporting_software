export const leaderboardregiontotals = (currentSales) => {
  return(dispatch) => {

    let leaderboardTotals = {}
    // let leaderboard = {3: {name: 'josh', id: 5, kw: 7}, 5: {a;lskdf;lasjdfl}, 8: {name: 'josh', kw: 6, sd: 1} }

  	currentSales.map(sale => {
      if(sale.region_id in leaderboardTotals) {
          leaderboardTotals[sale.region_id].kw += parseFloat(sale.kw)
          leaderboardTotals[sale.region_id].sit_down += parseFloat(sale.sit_down)
          leaderboardTotals[sale.region_id].close += parseFloat(sale.close)
          leaderboardTotals[sale.region_id].site_survey += parseFloat(sale.site_survey)
          leaderboardTotals[sale.region_id].cancel += parseFloat(sale.cancel)
          if(parseFloat(sale.site_survey) != 0) {
            leaderboardTotals[sale.region_id].site_survey_kw += parseFloat(sale.kw)
          }
      } else {
        leaderboardTotals[sale.region_id] = {}
        leaderboardTotals[sale.region_id].name = sale.region_id
        leaderboardTotals[sale.region_id].id = sale.region_id
        leaderboardTotals[sale.region_id].kw = parseFloat(sale.kw)
        leaderboardTotals[sale.region_id].sit_down = parseFloat(sale.sit_down)
        leaderboardTotals[sale.region_id].close = parseFloat(sale.close)
        leaderboardTotals[sale.region_id].site_survey = parseFloat(sale.site_survey)
        leaderboardTotals[sale.region_id].cancel = parseFloat(sale.cancel)
        if(parseFloat(sale.site_survey) != 0) {
          leaderboardTotals[sale.region_id].site_survey_kw = parseFloat(sale.kw)
        } else {
          leaderboardTotals[sale.region_id].site_survey_kw = 0
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

    dispatch({type: 'LEADERBOARD_REGION_TOTALS', leaderboardArray})

  }
}

export const leaderboardregiontotalssite = (currentSales) => {
  return(dispatch) => {

    let leaderboardTotals = {}
    // let leaderboard = {3: {name: 'josh', id: 5, kw: 7}, 5: {a;lskdf;lasjdfl}, 8: {name: 'josh', kw: 6, sd: 1} }

  	currentSales.map(sale => {
      if(sale.region_id in leaderboardTotals) {
          leaderboardTotals[sale.region_id].kw += parseFloat(sale.kw)
          leaderboardTotals[sale.region_id].sit_down += parseFloat(sale.sit_down)
          leaderboardTotals[sale.region_id].close += parseFloat(sale.close)
          leaderboardTotals[sale.region_id].site_survey += parseFloat(sale.site_survey)
          leaderboardTotals[sale.region_id].cancel += parseFloat(sale.cancel)
          if(parseFloat(sale.site_survey) != 0) {
            leaderboardTotals[sale.region_id].site_survey_kw += parseFloat(sale.kw)
          }
      } else {
        leaderboardTotals[sale.region_id] = {}
        leaderboardTotals[sale.region_id].name = sale.region_id
        leaderboardTotals[sale.region_id].id = sale.region_id
        leaderboardTotals[sale.region_id].kw = parseFloat(sale.kw)
        leaderboardTotals[sale.region_id].sit_down = parseFloat(sale.sit_down)
        leaderboardTotals[sale.region_id].close = parseFloat(sale.close)
        leaderboardTotals[sale.region_id].site_survey = parseFloat(sale.site_survey)
        leaderboardTotals[sale.region_id].cancel = parseFloat(sale.cancel)
        if(parseFloat(sale.site_survey) != 0) {
          leaderboardTotals[sale.region_id].site_survey_kw = parseFloat(sale.kw)
        } else {
          leaderboardTotals[sale.region_id].site_survey_kw = 0
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

    dispatch({type: 'LEADERBOARD_REGION_TOTALS', leaderboardArray})

  }
}
