import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Button, NavItem } from 'react-materialize';
import LeaderboardContainer from './LeaderboardContainer'

class LeaderboardSelector extends React.Component {
  constructor(props) {
    super(props)
  }

  showFilters() {
    return(
      <div>
        <NavItem value="KW" onClick={() => this.filterInfo("KW")}>KW</NavItem>
        <NavItem value="SS" onClick={() => this.filterInfo("SS")}>Site Survey</NavItem>
        <NavItem value="SSKW" onClick={() => this.filterInfo("SSKW")}>Site Survey KW</NavItem>
      </div>
    )
  }

  filterInfo(choice) {
    this.props.dispatch({type: 'CURRENT_FILTER', choice})
  }

  urlCheck(selectName) {
    if(window.location.pathname === '/leaderboards/regions') {
      return(
        <div className='col m2 offset-m5' style={{marginTop: '10px'}}>
          Sort by:
          <Dropdown trigger={<Button style={styles.employeeButton}>{selectName}</Button>}>
            { this.showFilters() }
          </Dropdown>
        </div>
      )
    } else {
      return(
        <div className='col s12 m2' style={{marginTop: '10px'}}>
          Sort by:
          <Dropdown trigger={<Button style={styles.employeeButton}>{selectName}</Button>}>
            { this.showFilters() }
          </Dropdown>
        </div>
      )
    }
  }

  render() {
    let selectName
    if (this.props.currentfilter.length != 0) {
      selectName = `${this.props.currentfilter}`
    } else {
      selectName = 'KW'
    }
    return(
      <div>
        {this.urlCheck(selectName)}
        <div className='col s12'>
        </div>
        <LeaderboardContainer />
      </div>
    )
  }
}

const styles = {
  employeeButton: {
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    textAlign: 'center',
    lineHeight: '42px',
    width: '100%',
    height: '40px',
    backgroundColor: '#60b9e8',
    color: '#f2f7f7',
    borderRadius: '0',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
  }
}

const mapStateToProps = (state) => {
  let { user, currentregion, currentoffice, assignedoffices, employees, currentfilter } = state
  return { user, currentregion, currentoffice, assignedoffices, employees, currentfilter }
}

export default connect(mapStateToProps)(LeaderboardSelector)
