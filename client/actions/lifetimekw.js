export const lifetimekw = (sales) => {

  return(dispatch) => {

    let LifetimeSiteSurveyKw = {SSKW: 0}
    sales.map(sale => {
      if(parseFloat(sale.cancel) != 1) {
        LifetimeSiteSurveyKw["SSKW"] += parseFloat(sale.kw)
      }
    })
    dispatch({type: 'LIFETIME_KW', LifetimeSiteSurveyKw})
  }

}
