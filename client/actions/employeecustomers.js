export const employeecustomers = (customers) => {
  return(dispatch) => {
    dispatch({type: 'EMPLOYEE_CUSTOMERS', customers})
  }
}
