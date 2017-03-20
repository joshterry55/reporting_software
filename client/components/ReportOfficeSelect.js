import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Button, NavItem } from 'react-materialize';
import { employees } from '../actions/employees';
import ReportContainer from './ReportContainer'


class ReportOfficeSelect extends React.Component {
  constructor(props) {
    super(props)

    this.officeInfo = this.officeInfo.bind(this)
  }

  showOffices(officeName) {
    return this.props.assignedoffices.map( office => {
      let regionId = this.props.currentregion.id
      if(office.region_id === regionId) {
        return(<option key={office.id} value={office.id} id={`office${office.id}`} placeholder={officeName}>{office.name}</option>);
      }
    });
  }

  officeInfo(currentOffice) {

    let office
    this.props.assignedoffices.map( r => {
      if($(`#office${r.id}`).is(':selected') === true) {
        office = r
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
        <form className='col s10 offset-s1 m6 offset-m3'>
          <br />
          <select ref='user' className='browser-default' style={{backgroundColor: 'white', border: '1px solid #bbb', color: 'black', fontSize: '18px', margin: '0 auto'}} onChange={this.officeInfo}>
            <option defaultValue="" selected id='office-default' style={{textAlign: 'center'}}>Select Office</option>
            {this.showOffices(officeName)}
          </select>
        </form>
        <div className='col s12'>
        </div>
        <ReportContainer />
      </div>
    )
  }
}

// <div className='col s10 offset-s1 m6 offset-m3'>
//   <br />
//   <Dropdown  trigger={<Button style={styles.employeeButton}>{officeName}</Button>}>
//     { this.showOffices() }
//   </Dropdown>
// </div>

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
  let { user, currentregion, currentoffice, assignedoffices, employees } = state
  return { user, currentregion, currentoffice, assignedoffices, employees }
}

export default connect(mapStateToProps)(ReportOfficeSelect)
