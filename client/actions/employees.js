export const employees = (officeId) => {
	return(dispatch) => {
    $.ajax({
      url: `/api/office/${officeId}/users`,
      type: 'GET',
      dataType: 'JSON',
      async: false
    }).done( users => {
      dispatch({ type: 'EMPLOYEES', users })
    }).fail( data => {
      console.log(data);
    });
	}
}

export const companyemployees = (companyId) => {
	return(dispatch) => {
    $.ajax({
      url: `/api/company/${companyId}/users`,
      type: 'GET',
      dataType: 'JSON',
      async: false
    }).done( users => {
      dispatch({ type: 'EMPLOYEES', users })
    }).fail( data => {
      console.log(data);
    });
	}
}
