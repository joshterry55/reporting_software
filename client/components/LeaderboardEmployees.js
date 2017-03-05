import React from 'react'
import { connect } from 'react-redux'
import LeaderboardOffice from './LeaderboardOffice'
import Leaderboards from './Leaderboards'
import { Dropdown, Button, NavItem } from 'react-materialize';
import { setassignedregions, setassignedoffices } from '../actions/companysetup'

class LeaderboardEmployees extends React.Component {
  constructor(props) {
    super(props)

    this.regionInfo = this.regionInfo.bind(this)
  }

  componentDidMount() {
    let companyId = this.props.assignedcompany.id
    this.props.dispatch(setassignedregions(companyId))
    this.props.dispatch(setassignedoffices(companyId))
  }

  showRegions() {
    if(this.props.leaderboardregions.length != undefined) {
      return this.props.leaderboardregions.map( region => {
        return(<NavItem key={region.id} value={region.id} onClick={() => this.regionInfo(region)}>{region.name}</NavItem>);
      });
    }
  }

  regionInfo(region) {
    this.props.dispatch({type: 'CURRENT_REGION', region})
    this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
    this.props.dispatch({type: 'RESET_OFFICE_SALES'})
  }

  render() {
    let regionName
    if (this.props.currentregion.name) {
      regionName = `${this.props.currentregion.name}`
    } else {
      regionName = 'Select Region'
    }
    return(
      <div className='row'>
        <Leaderboards />
          <div className='col s12 center' style={{backgroundColor: '#ccc', fontSize: '20px'}}>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
              Leaderboard
            </div>
          </div>
        <div className = 'col s12 m10 offset-m1' style={{paddingLeft: '0px', paddingRight: '0px'}}>
          <div className='col s12 m5' style={{marginTop: '10px'}}>
            <span>Region:</span>
            <Dropdown trigger={<Button style={styles.employeeButton}>{regionName}</Button>}>
              { this.showRegions() }
            </Dropdown>
          </div>
          <LeaderboardOffice />
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
    borderRadius: '5px',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
  }
}

const mapStateToProps = (state) => {
  let { user, assignedregions, currentregion, assignedcompany, leaderboardregions } = state
  return { user, assignedregions, currentregion, assignedcompany, leaderboardregions }
}

export default connect(mapStateToProps)(LeaderboardEmployees)
