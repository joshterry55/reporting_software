import React from 'react'
import { connect } from 'react-redux'
import AddSale from './AddSale'
import { Dropdown, Button, NavItem } from 'react-materialize';
import { employees } from '../actions/employees';

class OfficeSelect extends React.Component {
  constructor(props) {
    super(props)

    this.officeInfo = this.officeInfo.bind(this)
  }

  showOffices() {
    return this.props.assignedoffices.map( office => {
      let regionId = this.props.currentregion.id
      if(office.region_id === regionId) {
        return(<option key={office.id} value={office.id} id={`officeAdd${office.id}`} >{office.name}</option>);
      }
    });
  }

  officeInfo(currentOffice) {
    let office
    this.props.assignedoffices.map( o => {
      if($(`#officeAdd${o.id}`).is(':selected') === true) {
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
        <form className='col s10 offset-s1 m8 offset-m2'>
          <br />
          <select ref='user' className='browser-default' style={{backgroundColor: '#60b9e8', border: '1px solid #bbb', color: '#f2f7f7', textShadow: '1px 1px 1px rgba(0,0,0,0.5)', fontSize: '18px', margin: '0 auto'}} onChange={this.officeInfo}>
            <option defaultValue="" selected id='office-default' style={{textAlign: 'center'}}>Select Office</option>
            {this.showOffices()}
          </select>
        </form>
        <div className='col s12'>
          <br />
        </div>
        <AddSale />
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
    borderRadius: '0',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
  }
}

const mapStateToProps = (state) => {
  let { user, currentregion, currentoffice, assignedoffices, employees } = state
  return { user, currentregion, currentoffice, assignedoffices, employees }
}

export default connect(mapStateToProps)(OfficeSelect)
