export const leaderboardofficetotals = (currentSales) => {
  return(dispatch) => {

    let leaderboardTotals = {}
    // let leaderboard = {3: {name: 'josh', id: 5, kw: 7}, 5: {a;lskdf;lasjdfl}, 8: {name: 'josh', kw: 6, sd: 1} }

  	currentSales.map(sale => {
      if(sale.office_id in leaderboardTotals) {
          leaderboardTotals[sale.office_id].kw += parseFloat(sale.kw)
          leaderboardTotals[sale.office_id].sit_down += parseFloat(sale.sit_down)
          leaderboardTotals[sale.office_id].close += parseFloat(sale.close)
          leaderboardTotals[sale.office_id].site_survey += parseFloat(sale.site_survey)
          leaderboardTotals[sale.office_id].cancel += parseFloat(sale.cancel)
          if(parseFloat(sale.site_survey) != 0) {
            leaderboardTotals[sale.office_id].site_survey_kw += parseFloat(sale.kw)
          }
      } else {
        leaderboardTotals[sale.office_id] = {}
        leaderboardTotals[sale.office_id].name = sale.office_id
        leaderboardTotals[sale.office_id].id = sale.office_id
        leaderboardTotals[sale.office_id].kw = parseFloat(sale.kw)
        leaderboardTotals[sale.office_id].sit_down = parseFloat(sale.sit_down)
        leaderboardTotals[sale.office_id].close = parseFloat(sale.close)
        leaderboardTotals[sale.office_id].site_survey = parseFloat(sale.site_survey)
        leaderboardTotals[sale.office_id].cancel = parseFloat(sale.cancel)
        if(parseFloat(sale.site_survey) != 0) {
          leaderboardTotals[sale.office_id].site_survey_kw = parseFloat(sale.kw)
        } else {
          leaderboardTotals[sale.office_id].site_survey_kw = 0
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

    dispatch({type: 'LEADERBOARD_OFFICE_TOTALS', leaderboardArray})

  }
}

export const leaderboardofficetotalssite = (currentSales) => {
  return(dispatch) => {

    let leaderboardTotals = {}
    // let leaderboard = {3: {name: 'josh', id: 5, kw: 7}, 5: {a;lskdf;lasjdfl}, 8: {name: 'josh', kw: 6, sd: 1} }

  	currentSales.map(sale => {
      if(sale.office_id in leaderboardTotals) {
          leaderboardTotals[sale.office_id].kw += parseFloat(sale.kw)
          leaderboardTotals[sale.office_id].sit_down += parseFloat(sale.sit_down)
          leaderboardTotals[sale.office_id].close += parseFloat(sale.close)
          leaderboardTotals[sale.office_id].site_survey += parseFloat(sale.site_survey)
          leaderboardTotals[sale.office_id].cancel += parseFloat(sale.cancel)
          if(parseFloat(sale.site_survey) != 0) {
            leaderboardTotals[sale.office_id].site_survey_kw += parseFloat(sale.kw)
          }
      } else {
        leaderboardTotals[sale.office_id] = {}
        leaderboardTotals[sale.office_id].name = sale.office_id
        leaderboardTotals[sale.office_id].id = sale.office_id
        leaderboardTotals[sale.office_id].kw = parseFloat(sale.kw)
        leaderboardTotals[sale.office_id].sit_down = parseFloat(sale.sit_down)
        leaderboardTotals[sale.office_id].close = parseFloat(sale.close)
        leaderboardTotals[sale.office_id].site_survey = parseFloat(sale.site_survey)
        leaderboardTotals[sale.office_id].cancel = parseFloat(sale.cancel)
        if(parseFloat(sale.site_survey) != 0) {
          leaderboardTotals[sale.office_id].site_survey_kw = parseFloat(sale.kw)
        } else {
          leaderboardTotals[sale.office_id].site_survey_kw = 0
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

    dispatch({type: 'LEADERBOARD_OFFICE_TOTALS', leaderboardArray})

  }
}
