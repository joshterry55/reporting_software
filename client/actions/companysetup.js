export const companysetup = () => {
	return(dispatch) => {
    $.ajax({
        url: '/api/companies',
        type: 'GET',
        dataType: 'JSON',
        async: false
      }).done( company => {
        dispatch({ type: 'ASSIGNED_COMPANY', company })
      }).fail( data => {
        console.log(data);
      });
	}
}

export const regionsetup = () => {
	return(dispatch) => {
    $.ajax({
      url: '/api/regions',
      type: 'GET',
      dataType: 'JSON',
      async: false
    }).done( regions => {
      dispatch({ type: 'ASSIGNED_REGIONS', regions })
    }).fail( data => {
      console.log(data);
    });
	}
}

export const officesetup = () => {
	return(dispatch) => {
    $.ajax({
      url: '/api/offices',
      type: 'GET',
      dataType: 'JSON',
      async: false
    }).done( offices => {
      dispatch({ type: 'ASSIGNED_OFFICES', offices })
    }).fail( data => {
      console.log(data);
    });
	}
}
