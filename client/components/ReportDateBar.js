import React, { Component} from 'react';
import { connect } from 'react-redux';
import { officesales, regionsales, companysales } from '../actions/officesales';
import weekdates from '../actions/weekdates';
import SetWeek from './SetWeek'

class ReportDateBar extends Component {
	constructor(props) {
		super(props);

		this.showDates = this.showDates.bind(this);
		this.dispatchWeekDates = this.dispatchWeekDates.bind(this);
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
		let companyId = this.props.assignedcompany.id
		let pathName = window.location.pathname
		if(officeId != undefined && weekDates[0] != "undefined NaN, NaN") {
			this.props.dispatch(officesales(officeId, weekDates))
		}
		if(regionId != undefined && weekDates[0] != "undefined NaN, NaN" && pathName === '/leaderboards/offices') {
			this.props.dispatch(regionsales(regionId, weekDates))
		}
		if(companyId != undefined && weekDates[0] != "undefined NaN, NaN" && pathName === '/leaderboards/regions') {
			this.props.dispatch(companysales(companyId, weekDates))
		}
		if(companyId != undefined && weekDates[0] != "undefined NaN, NaN" && pathName === '/leaderboards/company') {
			this.props.dispatch(companysales(companyId, weekDates))
		}
		return(
			<div>
				{weekDates[0]} - {weekDates[6]}
				{this.dispatchWeekDates(weekDates, pathName)}
			</div>
		)
	}

	dispatchWeekDates(weekDates, pathName) {
		if(weekDates[0] != "undefined NaN, NaN" && pathName === '/reports') {
			return(
				<div>
					<SetWeek date={weekDates} />
				</div>
			)
		}
	}

	render() {
		return (
			<div style={{
				width: '100%',
				height: '40px',
				// backgroundColor: "#ccc",
				backgroundColor: `${this.props.assignedcompany.color}`,
				border: "1px solid #bbb",
				borderBottom: '0px solid #bbb',
				overflowX: 'scroll',
				overflowY: 'hidden',
				color: `${this.props.assignedcompany.color_text}`
				}}>
				<div style={styles.dateBar}>
					{this.showDates()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let { setdate, currentoffice, currentregion, assignedcompany } = state;
  return { setdate, currentoffice, currentregion, assignedcompany }
}

const styles = {
	dateBarWindow: {
		width: '100%',
		height: '40px',
		backgroundColor: "#888",
		border: "1px solid black",
		overflowX: 'scroll',
		overflowY: 'hidden',
	},
	dateBar: {
		width: '100%',
		textAlign: 'center',
		fontSize: '20px',
		lineHeight: '40px',
	}
}

export default connect(mapStateToProps)(ReportDateBar);
