import React from 'react'
import {connect} from 'react-redux'
import { employees } from '../actions/employees';
import { setFlash } from '../actions/flash';

class Employees extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addEmployee: false }

    this.toggleAdd = this.toggleAdd.bind(this)
    this.inviteEmployee = this.inviteEmployee.bind(this)
  }

  componentDidMount() {
    let path = window.location.pathname
    let officeId = path.replace(/\D/g, '')
    this.props.dispatch(employees(officeId))
  }

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
        <div>
          <form ref={(input) => this.inviteForm = input} className='row center' onSubmit={this.inviteEmployee}>
            <br />
            <div className='col s6 offset-s3'>
              <input ref='firstName' type='text' required placeholder='Employee First Name' autoFocus />
              <input ref='lastName' type='text' required placeholder='Employee Last Name' />
              <input ref='email' type='email' required placeholder='Employee Email' />
              <input className='btn blue darken-3' type='submit' />
            </div>
          </form>
          <button onClick={this.toggleAdd}>Cancel</button>
        </div>
      )
    } else {
      return(
        <button onClick={this.toggleAdd}>Add Employee</button>
      )
    }
  }

  displayEmployees() {
    if(this.props.employees.length) {
      return this.props.employees.map( employee => {
        return(
          <div key={employee.id}>{employee.first_name} {employee.last_name}</div>
        );
      });
    }
  }

  render() {
    return(
      <div>
        Employees Page
        {this.displayAdd()}
        <div className='collection'>
          {this.displayEmployees()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, currentregion, currentoffice, assignedcompany, employees } = state
  return { user, currentregion, currentoffice, assignedcompany, employees }
}

export default connect(mapStateToProps)(Employees)
