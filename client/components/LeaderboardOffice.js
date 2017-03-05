import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Button, NavItem } from 'react-materialize';
import { employees } from '../actions/employees';
import LeaderboardSelector from './LeaderboardSelector'


class LeaderboardOffice extends React.Component {
  constructor(props) {
    super(props)
  }

  showOffices() {
    if(this.props.leaderboardoffices.length != undefined) {
      return this.props.leaderboardoffices.map( office => {
        let regionId = this.props.currentregion.id
        if(office.region_id === regionId) {
          return(<NavItem key={office.id} value={office.id} onClick={() => this.officeInfo(office)}>{office.name}</NavItem>);
        }
      });
    }
  }

  officeInfo(office) {
    this.props.dispatch({type: 'CURRENT_OFFICE', office})
    let officeId = office.id
    this.props.dispatch(employees(officeId))
  }

  render() {
    let officeName
    if (this.props.currentoffice.name) {
      officeName = `${this.props.currentoffice.name}`
    } else {
      officeName = 'Select Office'
    }
    return(
      <div>
        <div className='col s12 m5' style={{marginTop: '10px'}}>
          <span>Office:</span>
          <Dropdown  trigger={<Button style={styles.employeeButton}>{officeName}</Button>}>
            { this.showOffices() }
          </Dropdown>
        </div>
        <LeaderboardSelector />
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
  let { user, currentregion, currentoffice, assignedoffices, employees, leaderboardoffices } = state
  return { user, currentregion, currentoffice, assignedoffices, employees, leaderboardoffices }
}

export default connect(mapStateToProps)(LeaderboardOffice)
