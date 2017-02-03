import React from 'react'
import { connect } from 'react-redux'
import AddSale from './AddSale'
import { Dropdown, Button, NavItem } from 'react-materialize';
import { employees } from '../actions/employees';

class OfficeSelect extends React.Component {
  constructor(props) {
    super(props)
  }

  showOffices() {
    return this.props.assignedoffices.map( office => {
      let regionId = this.props.currentregion.id
      if(office.region_id === regionId) {
        return(<NavItem key={office.id} value={office.id} onClick={() => this.officeInfo(office)}>{office.name}</NavItem>);
      }
    });
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
        <div className='col s10 offset-s1 m6 offset-m3'>
          <br />
          <Dropdown  trigger={<Button style={styles.employeeButton}>{officeName}</Button>}>
            { this.showOffices() }
          </Dropdown>
        </div>
        <div className='col s12'>
        </div>
        <AddSale />
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
    paddingLeft: '5px',
    backgroundColor: '#60b9e8',
    color: '#f2f7f7',
    borderRadius: '0',

  }
}

const mapStateToProps = (state) => {
  let { user, currentregion, currentoffice, assignedoffices, employees } = state
  return { user, currentregion, currentoffice, assignedoffices, employees }
}

export default connect(mapStateToProps)(OfficeSelect)
