import React from 'react'
import {connect} from 'react-redux'

class Employees extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addEmployee: false }

    this.toggleAdd = this.toggleAdd.bind(this)
    this.inviteEmployee = this.inviteEmployee.bind(this)
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
    let messageSuccess = `Invitation sent to ${employee.email}`
    this.inviteForm.reset();
    debugger
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
              <input ref='firstName' type='text' required placeholder='Employee First Name' />
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

  render() {
    return(
      <div>
        Employees Page
        {this.displayAdd()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, currentregion, currentoffice, assignedcompany } = state
  return { user, currentregion, currentoffice, assignedcompany }
}

export default connect(mapStateToProps)(Employees)
