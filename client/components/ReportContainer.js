import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import ReportDateBar from './ReportDateBar';
import ReportOfficeSales from './ReportOfficeSales';
let weekOffset = 0

class ReportContainer extends Component {
	constructor(props) {
		super(props);

		this.setWeekBack = this.setWeekBack.bind(this)
		this.setCurrent = this.setCurrent.bind(this)
		this.setWeekForward = this.setWeekForward.bind(this)
	}

	componentDidMount() {
		this.props.dispatch({type: 'SET_DATE'});
	}

	setWeekBack() {
		weekOffset += 1
		this.props.dispatch({type: 'SET_WEEK', weekOffset});

	}

	setCurrent() {
		weekOffset = 0
		this.props.dispatch({type: 'SET_WEEK', weekOffset});
	}

	setWeekForward() {
		weekOffset -= 1
		this.props.dispatch({type: 'SET_WEEK', weekOffset});
	}

	render() {
		return(
			<div>
				<div style={styles.topBarContainer}>
					<div className="col s12 center">
						<button type='button' style={styles.button} onClick={this.setWeekBack}>&lt;&lt;</button>&nbsp;
						<button type='button' className='btn' style={styles.buttonCurrent} onClick={this.setCurrent}>Current</button>&nbsp;
						<button type='button' style={styles.button} onClick={this.setWeekForward}>&gt;&gt;</button>
					</div>

				</div>
				<div className="col s12" style={styles.noPadding}>
					<ReportDateBar />
					<div style={styles.calendarWindow} className="scrollLinkedY scrollLinkedX">
						<div style={styles.calendar}>
							<ReportOfficeSales />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	topBarContainer: {
		height: '45px'
	},
	calendarWindow: {
		height: '454px',
		width: '100%',
		backgroundColor: "#ccc",
		border: "1px solid black",
		overflow: 'scroll',
	},
	calendar: {
		width: '1575px',
		minHeight: '1px'
	},
	button: {
		height: '30px',
		padding: '0 10px',
		margin: '6px 5px',
		borderRadius: '5px',
		border: '1px solid #666',
		backgroundColor: "linear-gradient(#bbb, #999)",
		boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
		fontSize: '20px',
		fontWeight: 'bold',
		lineHeight: '25px',
		color: '#333',
		textShadow: '0 1px #ddd'
	},
	buttonCurrent: {
		background: "#60b9e8",
		color: '#0d3c73',
		textShadow: '0 0 10px rgba(255,255,255,0.5), 0 1px #8cb7e8'
	},
	viewButton: {
    height: '21px',
    padding: '0 10px',
    borderRadius: '5px',
    border: '1px solid #666',
    background: "linear-gradient(#bbb, #999)",
    boxShadow: "inset 0 1px 0px  #fff, 0 0 5px rgba(0,0,0,0.25)",
    fontSize: '11px',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: '#333',
    textShadow: '0 1px #ddd',
    position: 'relative',
    top: '-1px'
  },
	noPadding: {
		paddingLeft: '0px'
	}
}

const mapStateToProps = (state) => {
  let { user } = state;
  return { user }
}

export default connect(mapStateToProps)(ReportContainer);
