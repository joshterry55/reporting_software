import React from 'react'
import { connect } from 'react-redux'
import { leaderboardtotals, leaderboardtotalssite } from '../actions/leaderboardtotals';
import { totalsales } from '../actions/totalsales';

class LeaderboardSetup extends React.Component {
  constructor(props) {
    super(props)

    this.leaderboardCalculations = this.leaderboardCalculations.bind(this)
    this.leaderboardCalculationsSS = this.leaderboardCalculationsSS.bind(this)
  }

  componentDidUpdate() {
    if(this.props.currentfilter === "SS") {
      this.leaderboardCalculationsSS()
    } else if (this.props.currentfilter === "KW") {
      this.leaderboardCalculations()
    } else {
      this.leaderboardCalculations()
    }
  }

  // TODO remember to check the component did update to find a better way, i know its redundant at the moment

  leaderboardCalculations() {
    let currentSales = this.props.officesales
    this.props.dispatch(leaderboardtotals(currentSales));
    this.props.dispatch(totalsales(currentSales))
  }

  leaderboardCalculationsSS() {
    let currentSales = this.props.officesales
    this.props.dispatch(leaderboardtotalssite(currentSales));
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
	let { setdate, currentoffice, officesales, employees, currentfilter } = state;
  return { setdate, currentoffice, officesales, employees, currentfilter }
}

export default connect(mapStateToProps)(LeaderboardSetup)
