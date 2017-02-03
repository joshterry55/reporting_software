import React, { Component} from 'react';
import { connect } from 'react-redux';
import { officesales } from '../actions/officesales';

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
		if(officeId != undefined && weekDates[0] != "undefined NaN, NaN") {
			this.props.dispatch(officesales(officeId, weekDates))
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
	let { setdate, currentoffice } = state;
  return { setdate, currentoffice }
}

const styles = {
	dateBarWindow: {
		width: '100%',
		height: '40px',
		backgroundColor: "#ccc",
		border: "1px solid black",
		borderBottom: '0px solid black',
		overflowX: 'scroll',
		overflowY: 'hidden'
	},
	dateBar: {
		width: '1575px'
	},
	dateBox: {
		width: "225px",
		height: "40px",
		border: "1px solid #333",
		backgroundColor: "#666",
		background: "linear-gradient(#999, #333)",
		position: "relative"
	},
	dateBoxToday: {
		backgroundColor: "#66f",
		background: "linear-gradient(#1b7ff2, #1257a6)",
	},
	dayText: {
		fontWeight: "bold",
		fontSize: "49px",
		color: "#fff",
		opacity: "0.25",
		position: "absolute",
		bottom: "-20px",
		left: "0"
	},
	dateText: {
		fontWeight: "bold",
		fontSize: "22px",
		color: "#fff",
		position: "absolute",
		bottom: "-8px",
		right: "1px",
		textShadow: "0 0 10px rgba(0,0,0,0.35)"
	},
	yearText: {
		fontWeight: "bold",
		fontSize: "20px",
		color: "#000",
		opacity: "0.15",
		position: "absolute",
		top: "-7px",
		right: "0"
	},
	leftFloat: {
		float: 'left'
	}
}

export default connect(mapStateToProps)(ReportDateBar);
