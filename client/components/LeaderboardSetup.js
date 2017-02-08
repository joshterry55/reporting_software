import React from 'react'
import { connect } from 'react-redux'
import { leaderboardtotals, leaderboardtotalssite } from '../actions/leaderboardtotals';
import { totalsales } from '../actions/totalsales';
import { leaderboardofficetotals, leaderboardofficetotalssite } from '../actions/leaderboardofficetotals'
import { leaderboardregiontotals, leaderboardregiontotalssite } from '../actions/leaderboardregiontotals'

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
    if(window.location.pathname === '/leaderboards/employees') {
      let currentSales = this.props.officesales
      this.props.dispatch(leaderboardtotals(currentSales));
      this.props.dispatch(totalsales(currentSales))
    } else if(window.location.pathname === '/leaderboards/offices') {
      let currentSales = this.props.regionsales
      this.props.dispatch(leaderboardofficetotals(currentSales))
      this.props.dispatch(totalsales(currentSales))
    } else if(window.location.pathname === '/leaderboards/regions') {
      let currentSales = this.props.companysales
      this.props.dispatch(leaderboardregiontotals(currentSales))
      this.props.dispatch(totalsales(currentSales))
    }
  }

  leaderboardCalculationsSS() {
    if(window.location.pathname === '/leaderboard/employees') {
      let currentSales = this.props.officesales
      this.props.dispatch(leaderboardtotalssite(currentSales));
      this.props.dispatch(totalsales(currentSales))
    } else if(window.location.pathname === '/leaderboards/offices') {
      let currentSales = this.props.regionsales
      this.props.dispatch(leaderboardofficetotalssite(currentSales))
      this.props.dispatch(totalsales(currentSales))
    } else if(window.location.pathname === '/leaderboards/regions') {
      let currentSales = this.props.companysales
      this.props.dispatch(leaderboardregiontotalssite(currentSales))
      this.props.dispatch(totalsales(currentSales))
    }
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	let { setdate, currentoffice, officesales, employees, currentfilter, regionsales, companysales } = state;
  return { setdate, currentoffice, officesales, employees, currentfilter, regionsales, companysales }
}

export default connect(mapStateToProps)(LeaderboardSetup)
