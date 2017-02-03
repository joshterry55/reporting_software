export const officesales = (officeId, weekDates) => {
	return(dispatch) => {
		$.ajax({
			url: `/api/office/${officeId}/sales`,
			type: 'GET',
			dataType: 'JSON',
			data: { startday: weekDates}
		}).done( sales => {
			dispatch({ type: 'OFFICE_SALES', sales})
		})
	}
}
