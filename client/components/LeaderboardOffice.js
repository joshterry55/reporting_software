import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Button, NavItem } from 'react-materialize';
import { employees } from '../actions/employees';
import LeaderboardSelector from './LeaderboardSelector'


class LeaderboardOffice extends React.Component {
  constructor(props) {
    super(props)

    this.officeInfo = this.officeInfo.bind(this)
  }

  showOffices() {
    if(this.props.leaderboardoffices.length != undefined) {
      return this.props.leaderboardoffices.map( office => {
        let regionId = this.props.currentregion.id
        if(office.region_id === regionId) {
          return(<option key={office.id} value={office.id} id={`empOffice${office.id}`} >{office.name}</option>);
        }
      });
    }
  }

  officeInfo(currentOffice) {
    let office
    this.props.leaderboardoffices.map( o => {
      if($(`#empOffice${o.id}`).is(':selected') === true) {
        office = o
      }
    })
    if(office) {
      this.props.dispatch({type: 'CURRENT_OFFICE', office})
      let officeId = office.id
      this.props.dispatch(employees(officeId))
    }
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
        <form className='col s12 m5' style={{marginTop: '10px'}}>
          <span>Office:</span>
          <select ref='user' className='browser-default' style={{backgroundColor: 'white', border: '1px solid #bbb', color: 'black', fontSize: '18px', margin: '0 auto'}} onChange={this.officeInfo}>
            <option defaultValue="" selected id='office-default' style={{textAlign: 'center'}}>Select Office</option>
            {this.showOffices()}
          </select>
        </form>
        <LeaderboardSelector />
      </div>
    )
  }
}

// <Dropdown  trigger={<Button style={styles.employeeButton}>{officeName}</Button>}>
//   { this.showOffices() }
// </Dropdown>

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
