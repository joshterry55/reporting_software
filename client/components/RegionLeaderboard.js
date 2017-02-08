import React from 'react'
import { connect } from 'react-redux'
import LeaderboardSelector from './LeaderboardSelector'
import Leaderboards from './Leaderboards'
import { Dropdown, Button, NavItem } from 'react-materialize';
import { setassignedregions, setassignedoffices } from '../actions/companysetup'

class RegionLeaderboard extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    let companyId = this.props.assignedcompany.id
    this.props.dispatch(setassignedregions(companyId))
    this.props.dispatch(setassignedoffices(companyId))
  }

  render() {
    return(
      <div className='row container white-container'>
      <Leaderboards />
        <div className='col s12'>
          <div className = 'col s12'>
            <div className='col s10 offset-s1 m6 offset-m3' style={{marginTop: '15px'}}>
              <h4 className='center'>Leaderboard</h4>
            </div>
            <LeaderboardSelector />
          </div>
        </div>
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
  let { user, assignedregions, currentregion, assignedcompany, leaderboardregions } = state
  return { user, assignedregions, currentregion, assignedcompany, leaderboardregions }
}

export default connect(mapStateToProps)(RegionLeaderboard)