import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import ReportDateBar from './ReportDateBar';
import LeaderboardDisplay from './LeaderboardDisplay';
import OfficeLeaderboardDisplay from './OfficeLeaderboardDisplay';
import RegionLeaderboardDisplay from './RegionLeaderboardDisplay';
import CompanyLeaderboardDisplay from './CompanyLeaderboardDisplay';
import LeaderboardSetup from './LeaderboardSetup';
let weekOffset = 0

class LeaderboardContainer extends Component {
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

	urlCheck() {
		if(window.location.pathname === '/leaderboards/employees') {
			return(
				<div>
					<LeaderboardSetup />
					<LeaderboardDisplay />
				</div>
			)
		} else if(window.location.pathname === '/leaderboards/offices') {
			return(
				<div>
					<LeaderboardSetup />
					<OfficeLeaderboardDisplay />
				</div>
			)
		} else if(window.location.pathname === '/leaderboards/regions') {
			return(
				<div>
					<LeaderboardSetup />
					<RegionLeaderboardDisplay />
				</div>
			)
		} else if(window.location.pathname === '/leaderboards/company') {
			return(
				<div>
					<LeaderboardSetup />
					<CompanyLeaderboardDisplay />
				</div>
			)
		}
	}


	render() {
		return(
			<div>
				<div className='col s12'><br /></div>
				<div style={styles.topBarContainer}>
					<div className="col s12 center">
						<button type='button' style={styles.button} onClick={this.setWeekBack}>&lt;&lt;</button>&nbsp;
						<button type='button' className='btn' style={styles.buttonCurrent} onClick={this.setCurrent}>Current</button>&nbsp;
						<button type='button' style={styles.button} onClick={this.setWeekForward}>&gt;&gt;</button>
					</div>
				</div>
				<div className='col s12'><br /></div>
				<div className="col s12" >
					<ReportDateBar />
					<div style={styles.calendarWindow} className="scrollLinkedY scrollLinkedX">
						<div style={styles.calendar}>
							{this.urlCheck()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	topBarContainer: {
		height: '45px',
	},
	calendarWindow: {
		height: '600px',
		width: '100%',
		backgroundColor: "#ccc",
		border: "1px solid black",
		overflow: 'scroll',
		marginBottom: '20px'
	},
	calendar: {
		minHeight: '1px',
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
		color: '#f2f7f7',
		textShadow: '1px 1px 1px rgba(0,0,0,0.5)'

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

export default connect(mapStateToProps)(LeaderboardContainer);
