export const sixmonth = (sales) => {
  return(dispatch) => {

    let sixMonthTotals = {}

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date();
    let d;
    let month;

    for(var i = 5; i > -1; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month = monthNames[d.getMonth()];
      sixMonthTotals[month] = 0
    }

    let currentSaleDate
    let currentMonth
    let monthName
    let formatDate
    let date
  	sales.map(sale => {
      if(sale.site_survey === 1) {
        if(sale.cancel != 1) {
          date = sale.date
          formatDate = date.replace(/-/g, '/')
          currentSaleDate = new Date(formatDate)
          currentMonth = currentSaleDate.getMonth()
          monthName = monthNames[currentMonth]
          sixMonthTotals[monthName] += parseFloat(sale.site_survey)
        }
      } else {
      }

  	})

    dispatch({type: 'SIX_MONTH_AVERAGE', sixMonthTotals})
  }
}
