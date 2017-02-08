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

export const regionsales = (regionId, weekDates) => {
	return(dispatch) => {
		$.ajax({
			url: `/api/region/${regionId}/sales`,
			type: 'GET',
			dataType: 'JSON',
			data: { startday: weekDates}
		}).done( sales => {
			dispatch({ type: 'REGION_SALES', sales})
		})
	}
}

export const companysales = (companyId, weekDates) => {
	return(dispatch) => {
		$.ajax({
			url: `/api/company/${companyId}/sales`,
			type: 'GET',
			dataType: 'JSON',
			data: { startday: weekDates}
		}).done( sales => {
			dispatch({ type: 'COMPANY_SALES', sales})
		})
	}
}
