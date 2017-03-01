export const threemonth = (sales) => {
  return(dispatch) => {

    let threeMonthTotals = {id: 0, kw: 0, sit_down: 0, close: 0, site_survey: 0, site_survey_kw: 0, cancel: 0}

  	sales.map(sale => {
      threeMonthTotals.kw += parseFloat(sale.kw)
      threeMonthTotals.sit_down += parseFloat(sale.sit_down)
      threeMonthTotals.close += parseFloat(sale.close)
      threeMonthTotals.cancel += parseFloat(sale.cancel)
      if(parseFloat(sale.site_survey) != 0) {
        if(parseFloat(sale.cancel) != 1 ) {
          threeMonthTotals.site_survey += parseFloat(sale.site_survey)
          threeMonthTotals.site_survey_kw += parseFloat(sale.kw)
        }
      }
      if(threeMonthTotals.id === 0) {
        threeMonthTotals.id = sale.id
      }
  	})

    threeMonthTotals.site_survey_kw = threeMonthTotals.site_survey_kw.toFixed(2)

    dispatch({type: 'THREE_MONTH_AVERAGE', threeMonthTotals})
  }
}
