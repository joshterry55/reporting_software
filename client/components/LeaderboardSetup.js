import React from 'react'
import { connect } from 'react-redux'
import { leaderboardtotals } from '../actions/leaderboardtotals';

class LeaderboardSetup extends React.Component {
  constructor(props) {
    super(props)

    this.leaderboardCalculations = this.leaderboardCalculations.bind(this)
  }

  componentDidUpdate() {
    if(this.props.officesales.length) {
      this.leaderboardCalculations();
    } else {
      this.props.dispatch({type: 'RESET_KW'})
      this.props.dispatch({type: 'RESET_SIT_DOWN'})
      this.props.dispatch({type: 'RESET_CLOSE'})
      this.props.dispatch({type: 'RESET_SITE_SURVEY'})
      this.props.dispatch({type: 'RESET_CANCEL'})
    }
  }

  // TODO remember to check the component did update to find a better way, i know its redundant at the moment

  leaderboardCalculations() {
    let currentSales = this.props.officesales
    this.props.dispatch(leaderboardtotals(currentSales));
  }

  render() {

    return(
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	let { setdate, currentoffice, officesales, employees } = state;
  return { setdate, currentoffice, officesales, employees }
}

export default connect(mapStateToProps)(LeaderboardSetup)
