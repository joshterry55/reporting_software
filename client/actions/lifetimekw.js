export const lifetimekw = (sales) => {

  return(dispatch) => {

    let LifetimeSiteSurveyKw = {SSKW: 0}
    sales.map(sale => {
      LifetimeSiteSurveyKw["SSKW"] += parseFloat(sale.kw)
    })
    dispatch({type: 'LIFETIME_KW', LifetimeSiteSurveyKw})
  }

}
