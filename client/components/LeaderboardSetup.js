import React from 'react'
import { connect } from 'react-redux'
import { leaderboardtotals, leaderboardtotalssite, leaderboardtotalssitekw } from '../actions/leaderboardtotals';
import { totalsales } from '../actions/totalsales';
import { leaderboardofficetotals, leaderboardofficetotalssite, leaderboardofficetotalssitekw } from '../actions/leaderboardofficetotals'
import { leaderboardregiontotals, leaderboardregiontotalssite, leaderboardregiontotalssitekw } from '../actions/leaderboardregiontotals'

class LeaderboardSetup extends React.Component {
  constructor(props) {
    super(props)

    this.leaderboardCalculations = this.leaderboardCalculations.bind(this)
    this.leaderboardCalculationsSS = this.leaderboardCalculationsSS.bind(this)
    this.leaderboardCalculationsSSKW = this.leaderboardCalculationsSSKW.bind(this)
  }

  componentDidUpdate() {
    if(this.props.currentfilter === "SS") {
      this.leaderboardCalculationsSS()
    } else if (this.props.currentfilter === "KW") {
      this.leaderboardCalculations()
    } else if(this.props.currentfilter === "SSKW") {
      this.leaderboardCalculationsSSKW()
    } else {
      this.leaderboardCalculationsSS()
    }
  }

  // TODO remember to check the component did update to find a better way, i know its redundant at the moment

  leaderboardCalculations() {
    if(window.location.pathname === '/leaderboards/employees') {
      let currentSales = this.props.officesales
      if(currentSales.length) {
        this.props.dispatch(leaderboardtotals(currentSales));
        this.props.dispatch(totalsales(currentSales))
      } else {
        this.props.dispatch({type: 'RESET_LEADERBOARD'})
      }
    } else if(window.location.pathname === '/leaderboards/offices') {
      let currentSales = this.props.regionsales
      if(currentSales.length) {
        this.props.dispatch(leaderboardofficetotals(currentSales))
        this.props.dispatch(totalsales(currentSales))
      } else {
        this.props.dispatch({type: 'RESET_OFFICE_LEADERBOARD'})
      }
    } else if(window.location.pathname === '/leaderboards/regions') {
      let currentSales = this.props.companysales
      if(currentSales.length) {
        this.props.dispatch(leaderboardregiontotals(currentSales))
        this.props.dispatch(totalsales(currentSales))
      } else {
        this.props.dispatch({type: 'RESET_REGION_LEADERBOARD'})
      }
    } else if(window.location.pathname === '/leaderboards/company') {
      let currentSales = this.props.companysales
      if(currentSales.length) {
        this.props.dispatch(totalsales(currentSales))
      }
    }
  }

  leaderboardCalculationsSS() {
    if(window.location.pathname === '/leaderboards/employees') {
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
    } else if(window.location.pathname === '/leaderboards/company') {
      let currentSales = this.props.companysales
      this.props.dispatch(totalsales(currentSales))
    }
  }

  leaderboardCalculationsSSKW() {
    if(window.location.pathname === '/leaderboards/employees') {
      let currentSales = this.props.officesales
      this.props.dispatch(leaderboardtotalssitekw(currentSales));
      this.props.dispatch(totalsales(currentSales))
    } else if(window.location.pathname === '/leaderboards/offices') {
      let currentSales = this.props.regionsales
      this.props.dispatch(leaderboardofficetotalssitekw(currentSales))
      this.props.dispatch(totalsales(currentSales))
    } else if(window.location.pathname === '/leaderboards/regions') {
      let currentSales = this.props.companysales
      this.props.dispatch(leaderboardregiontotalssitekw(currentSales))
      this.props.dispatch(totalsales(currentSales))
    } else if(window.location.pathname === '/leaderboards/company') {
      let currentSales = this.props.companysales
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
