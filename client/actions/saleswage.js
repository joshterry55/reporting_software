export const saleswage = (sales) => {
  return(dispatch) => {

    let salesWage = {kw: 0}

  	sales.map(sale => {
      salesWage.kw += parseFloat(sale.kw)
  	})
    salesWage.kw = salesWage.kw.toFixed(1)

    dispatch({type: 'SALES_WAGE', salesWage})
  }
}
