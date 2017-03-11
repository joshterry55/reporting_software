import React from 'react'
import {connect} from 'react-redux'
import { employees } from '../actions/employees';
import { setFlash } from '../actions/flash';
import EmployeeInfo from './EmployeeInfo'

class Employees extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addEmployee: false }

    this.toggleAdd = this.toggleAdd.bind(this)
    this.setCurrent = this.setCurrent.bind(this)
    this.inviteEmployee = this.inviteEmployee.bind(this)
  }

  componentDidMount() {
    let officeId = this.props.urlParams
    this.props.dispatch(employees(officeId))
  }

  // alternative to this.props.urlParams
  // let path = window.location.pathname
  // let officeId = path.replace(/\D/g, '')

  toggleAdd() {
    this.setState({addEmployee: !this.state.addEmployee})
  }

  inviteEmployee(e) {
  e.preventDefault();
  let companyId = this.props.assignedcompany.id
  let regionId = this.props.currentregion.id
  let officeId = this.props.currentoffice.id
  $.ajax({
    url: '/users/invitation',
    type: 'POST',
    data: {
      company_id: companyId,
      region_id: regionId,
      office_id: officeId,
      user: { email: this.refs.email.value,
              first_name: this.refs.firstName.value,
              last_name: this.refs.lastName.value }},
    dataType: 'JSON'
  }).done( employee => {
    this.props.dispatch({type: 'ADD_EMPLOYEE', employee})
    this.inviteForm.reset();
    let messageSuccess = `Invitation sent to ${employee.email}`
    this.props.dispatch(setFlash(messageSuccess, 'success'))
    this.toggleAdd()
  }).fail( err => {
    debugger
    let message = "Email already exists";
  })
  }

  displayAdd() {
    if(this.state.addEmployee) {
      return(
        <div className='col s12'>
          <div className='col s12 m4 offset-m4'>
            <form ref={(input) => this.inviteForm = input} className='row center' onSubmit={this.inviteEmployee}>
              <br />
              <div className='col s12'>
                <input ref='firstName' type='text' required placeholder='Employee First Name' autoFocus />
                <input ref='lastName' type='text' required placeholder='Employee Last Name' />
                <input ref='email' type='email' required placeholder='Employee Email' />
                <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Add' />
              </div>
            </form>
            <div className='center col s12' style={{marginBottom: '10px'}}>
              <span onClick={this.toggleAdd} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className='center'>
          <span className='add-sale' onClick={this.toggleAdd} style={{cursor: 'pointer', color: '#60b9e8'}}>+ Add Employee</span>
        </div>
      )
    }
  }

  // displayEmployees() {
  //   if(this.props.employees.length) {
  //     return this.props.employees.map( employee => {
  //       return(
  //         <div key={employee.id}>{employee.first_name} {employee.last_name}</div>
  //       );
  //     });
  //   }
  // }

  employeeSelector() {
    if(this.props.employees.length) {
      return this.props.employees.map( employee => {
        return(<option key={employee.id} value={employee.id} id={`admin${employee.id}`}>{`${employee.first_name} ${employee.last_name}`}</option>);
      });
    }
  }

  setCurrent() {

    let user
    this.props.employees.map( employee => {
      if($(`#admin${employee.id}`).is(':selected') === true) {
        user = employee
      }
    })
    if(user) {
      this.props.dispatch({type: 'CURRENT_USER', user})
    }
  }

  displayEmployees() {
    return(
      <div>
        <form className='col s12'>
          <div className='col s12 m4 offset-m4' style={{marginTop: '15px'}}>
            <select ref='user' className='browser-default' style={{backgroundColor: '#f2f7f', border: '1px solid #bbb'}} onChange={this.setCurrent}>
              <option defaultValue="" disabled selected>Select a salesman</option>
              {this.employeeSelector()}
            </select>
          </div>
        </form>
      </div>
    )
  }

  currentEmployeeInfo() {
    if(this.props.currentuser.id) {
      return(
        <div style={{paddingTop: '10px'}}>
          <EmployeeInfo />
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.displayAdd()}
        <div className='col s12'>
          {this.displayEmployees()}
        </div>
        {this.currentEmployeeInfo()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, currentregion, currentoffice, assignedcompany, employees, currentuser } = state
  return { user, currentregion, currentoffice, assignedcompany, employees, currentuser }
}

export default connect(mapStateToProps)(Employees)
