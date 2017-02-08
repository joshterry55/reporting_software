import React, { Component} from 'react';
import { connect } from 'react-redux';
import { officesales, regionsales } from '../actions/officesales';
import weekdates from '../actions/weekdates';

class ReportDateBar extends Component {
	constructor(props) {
		super(props);

		this.showDates = this.showDates.bind(this);
	}

	thisDate(day) {
		let dayOffset = this.props.setdate - day;
		let fullDate = new Date(Date.now()-((dayOffset * 24)*60*60*1000));
		let myDate = []
		myDate.push(fullDate.toDateString().substr(0, 3))
		let monthNumber = fullDate.getMonth();
		let monthNames = ["January", "February", "March", "April",
											"May", "June", "July", "August", "September",
											"October", "November", "December"]
		myDate.push(monthNames[monthNumber] + ' ' + fullDate.getDate())
		myDate.push(fullDate.getFullYear())

		return myDate
	}

	showDates() {
		let days = [0,1,2,3,4,5,6];
		let weekDates = []
		days.map( day => {
			let myDate = this.thisDate(day);
			let todayDate = `${myDate[1]}, ${myDate[2]}`
			weekDates.push(todayDate)
		})
		let officeId = this.props.currentoffice.id
		let regionId = this.props.currentregion.id
		let pathName = window.location.pathname
		if(officeId != undefined && weekDates[0] != "undefined NaN, NaN") {
			this.props.dispatch(officesales(officeId, weekDates))
			this.props.dispatch(weekdates(weekDates))
		}
		if(regionId != undefined && weekDates[0] != "undefined NaN, NaN") {
			this.props.dispatch(regionsales(regionId, weekDates))
			this.props.dispatch(weekdates(weekDates))
		}
		return(
			<div>
				{weekDates[0]} - {weekDates[6]}
			</div>
		)
	}

	render() {
		return (
			<div style={styles.dateBarWindow}>
				<div style={styles.dateBar}>
					{this.showDates()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let { setdate, currentoffice, currentregion } = state;
  return { setdate, currentoffice, currentregion }
}

const styles = {
	dateBarWindow: {
		width: '100%',
		height: '40px',
		// backgroundColor: "#ccc",
		backgroundColor: "#888",
		border: "1px solid black",
		borderBottom: '0px solid black',
		overflowX: 'scroll',
		overflowY: 'hidden',
		boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)'
		// boxShadow: 'inset 0 0 5px black'
	},
	dateBar: {
		width: '100%',
		textAlign: 'center',
		fontSize: '20px',
		lineHeight: '40px',
		fontWeight: 'bold',
		color: '#f2f7f7',
		textShadow: '1px 1px 1px rgba(0,0,0,0.75)'
	}
}

export default connect(mapStateToProps)(ReportDateBar);
