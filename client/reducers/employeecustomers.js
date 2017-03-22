const employeecustomers = (state = [], action) => {
  switch(action.type) {
    case 'EMPLOYEE_CUSTOMERS':
      let allSales = action.customers
      let allSortedSales = allSales.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
      });
      return allSortedSales
    case 'RESET_EMPLOYEE_CUSTOMERS':
      return action.customers = []
    default:
      return state;
  }
}

export default employeecustomers
