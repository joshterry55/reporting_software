import React from 'react'
import { connect } from 'react-redux'
import { leaderboardtotals } from '../actions/leaderboardtotals';
import { totalsales } from '../actions/totalsales';

class LeaderboardSetup extends React.Component {
  constructor(props) {
    super(props)

    this.leaderboardCalculations = this.leaderboardCalculations.bind(this)
  }

  componentDidUpdate() {
    this.leaderboardCalculations()
  }

  // TODO remember to check the component did update to find a better way, i know its redundant at the moment

  leaderboardCalculations() {
    let currentSales = this.props.officesales
    this.props.dispatch(leaderboardtotals(currentSales));
    this.props.dispatch(totalsales(currentSales))
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
