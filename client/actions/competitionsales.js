export const competitionsales = (sales) => {
  return(dispatch) => {

    let competitionTotals = {}
    let groupTotals = { office: {}, region: {}, company: {} }
  	sales.map(sale => {
      if(parseFloat(sale.cancel) === 0) {
        if(sale.user_id in competitionTotals) {
          competitionTotals[sale.user_id].site_survey += parseFloat(sale.site_survey)
        } else {
          competitionTotals[sale.user_id] = {}
          competitionTotals[sale.user_id].id = sale.user_id
          competitionTotals[sale.user_id].site_survey = parseFloat(sale.site_survey)
        }
        if(sale.office_id in groupTotals['office']) {
          groupTotals['office'][sale.office_id] += parseFloat(sale.site_survey)
        } else {
          groupTotals['office'][sale.office_id] = sale.site_survey
        }
        if(sale.region_id in groupTotals['region']) {
          groupTotals['region'][sale.region_id] += parseFloat(sale.site_survey)
        } else {
          groupTotals['region'][sale.region_id] = sale.site_survey
        }
        if(sale.company_id in groupTotals['company']) {
          groupTotals['company'][sale.company_id] += parseFloat(sale.site_survey)
        } else {
          groupTotals['company'][sale.company_id] = sale.site_survey
        }
      }
  	})

    let newArray = []

    for (var key in competitionTotals) {
      newArray.push(competitionTotals[key]);
    }

    let competitionArray = newArray.sort(function(a, b) {
      return b.site_survey - a.site_survey;
    });

    let groupArray = groupTotals

    dispatch({type: 'COMPETITION_TOTALS', competitionArray})
    dispatch({type: 'GROUP_TOTALS', groupArray})

  }
}
