export const totalsales = (currentSales) => {

  return(dispatch) => {

    let officeTotalKw = {KW: 0}
    let officeTotalSitDown = {SD: 0}
    let officeTotalClose = {CL: 0}
    let officeTotalSiteSurvey = {SS: 0}
    let officeTotalCancel = {CA: 0}
    let officeTotalSiteSurveyKw = {SSKW: 0}
    currentSales.map(sale => {
      officeTotalKw["KW"] += parseFloat(sale.kw)
      officeTotalSitDown["SD"] += parseFloat(sale.sit_down)
      officeTotalClose["CL"] += parseFloat(sale.close)
      officeTotalSiteSurvey["SS"] += parseFloat(sale.site_survey)
      officeTotalCancel["CA"] += parseFloat(sale.cancel)
      if(parseFloat(sale.site_survey) != 0) {
        officeTotalSiteSurveyKw["SSKW"] += parseFloat(sale.kw)
      }
    })
    dispatch({type: 'TOTAL_KW', officeTotalKw})
    dispatch({type: 'TOTAL_SIT_DOWN', officeTotalSitDown})
    dispatch({type: 'TOTAL_CLOSE', officeTotalClose})
    dispatch({type: 'TOTAL_SITE_SURVEY', officeTotalSiteSurvey})
    dispatch({type: 'TOTAL_CANCEL', officeTotalCancel})
    dispatch({type: 'TOTAL_SITE_SURVEY_KW', officeTotalSiteSurveyKw})
  }

}
