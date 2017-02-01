export const currentregion = (regionId) => {
	return(dispatch) => {
    $.ajax({
      url: `/api/regions/${regionId}`,
      type: 'GET',
      dataType: 'JSON',
      async: false
    }).done( region => {
      dispatch({ type: 'CURRENT_REGION', region })
    }).fail( data => {
      console.log(data);
    });
	}
}
