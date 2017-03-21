import React from 'react'
import {connect} from 'react-redux'
import { setFlash } from '../actions/flash';

class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = { edit: false }

    this.toggleEdit = this.toggleEdit.bind(this)
    this.updateEmployee = this.updateEmployee.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
  }

  componentDidUpdate() {
    this.refs.firstName.value = this.props.currentuser.first_name
    this.refs.lastName.value = this.props.currentuser.last_name
    this.refs.role.value = this.props.currentuser.role
    if(this.props.currentuser.phone_number) {
      this.refs.phoneNumber.value = this.props.currentuser.phone_number
    } else {
      this.refs.phoneNumber.value = 'None'
    }
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  joinedDate(date) {
    let day = new Date(date)
    let fullDate = day
    let myDate = []
    myDate.push(fullDate.toDateString().substr(0, 3))
    let monthNumber = fullDate.getMonth();
    let monthNames = ["January", "February", "March", "April",
                      "May", "June", "July", "August", "September",
                      "October", "November", "December"]
    myDate.push(monthNames[monthNumber] + ' ' + fullDate.getDate())
    myDate.push(fullDate.getFullYear())

    return `${myDate[1]}, ${myDate[2]}`
  }

  acceptedInvite(invite) {
    if(invite) {
      return(
        <span>Yes</span>
      )
    } else {
      return(
        <span>No</span>
      )
    }
  }

  joined(joined) {
    if(joined) {
      return(
        <span>{this.joinedDate(joined)}</span>
      )
    } else {
      return(
        <span>Invitation pending</span>
      )
    }
  }

  updateEmployee(e) {
    e.preventDefault()
    let first = this.refs.firstName.value
    let last = this.refs.lastName.value
    let role = this.refs.role.value
    let phone = this.refs.phoneNumber.value
    let id = this.props.currentuser.id

    $.ajax({
      url: `/api/users/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { user: {
        first_name: first,
        last_name: last,
        role: role,
        phone_number: phone
      }}
    }).done( user => {
      let messageSuccess = `Employee Updated`
      this.props.dispatch(setFlash(messageSuccess, 'success'))
      this.props.dispatch({type: 'UPDATE_EMPLOYEE', user})
    }).fail( data => {
      debugger
    })
  }

  deleteEmployee() {
    let confirmed = confirm('Are you sure you want to delete this employee? Doing so will delete all of their info.')
    let id = this.props.currentuser.id
    if(confirmed) {
      $.ajax({
        url: `/api/users/${id}`,
        type: 'DELETE',
        dataType: 'JSON'
      }).done( user => {
        let messageSuccess = `${user.first_name} ${user.last_name} Deleted`
        this.props.dispatch(setFlash(messageSuccess, 'success'))
        this.props.dispatch({type: 'REMOVE_EMPLOYEE', user})
        this.props.dispatch({type: 'RESET_CURRENT_USER'})
      }).fail( data => {

      })
    }
  }

  display() {
    if(this.props.currentuser.id) {
      let employee = this.props.currentuser
      if(this.state.edit) {
        return(
          <div className='col s12'>

          </div>
        )
      } else {
        return(
            <div className="col s12"  style={{backgroundColor: '#ddd', paddingLeft: '0px', paddingRight: '0px'}}>
              <div className='col s12 m4 l3' style={{paddingTop: '10px'}}>
                <div style={{height: '200px', marginBottom: '10px'}}>
                  <div style={{
                      backgroundImage: `url(${employee.avatar})`,
                      width: '100%',
                      height: '100%',
                      maxWidth: '200px',
                      display: 'block',
                      backgroundSize: 'cover',
                      borderRadius: '5px',
                      boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                      margin: '10px auto'
                    }}>
                  </div>
                </div>
                <div className='col s12 center' style={{fontSize: '20px'}}>{employee.first_name} {employee.last_name}</div>
              </div>
              <form className='col s12 m8 l9 test-test' style={{backgroundColor: '#f27f7', minHeight: '500px', paddingLeft: '30px', fontSize: '13px'}} onSubmit={this.updateEmployee}>
                <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>First Name:</b>
                  <input type='text' ref='firstName' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={employee.first_name} required/>
                </div>
                <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Last Name:</b> <br />
                  <input type='text' ref='lastName' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={employee.last_name} required />
                </div>
                <div className='col s12 m6 l4' style={{marginBottom: '30px', paddingRight: '0px'}}><b>Email:</b> <br />
                  <div style={{fontSize: '18px', height: '42px', paddingLeft: '12px', border: '1px solid #ddd', lineHeight: '42px'}}>{employee.email}</div>
                </div>
                <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Phone Number: </b>(8005557777) <br />
                  <input type='text' ref='phoneNumber' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={employee.phone_number ? employee.phone_number : 'None'} />
                </div>
                <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px', paddingRight: '0px'}}><b>Company Role:</b> <br />
                  <select ref='role' className="browser-default employee-info" defaultValue={employee.role}>
                    <option value='Employee'>Employee</option>
                    <option value='Regional Manager'>Regional Manager</option>
                  </select>
                </div>
                <div className='col s12 m6 l4' style={{marginBottom: '30px', paddingRight: '0px'}}><b>Invitation Sent:</b> <br />
                  <div style={{fontSize: '18px', height: '42px', paddingLeft: '12px', border: '1px solid #ddd', lineHeight: '42px'}}>{this.joinedDate(employee.invitation_sent_at)}</div>
                </div>
                <div className='col s12 m6 l4' style={{marginBottom: '30px', paddingRight: '0px'}}><b>Invitation Accepted:</b> <br />
                  <div style={{fontSize: '18px', height: '42px', paddingLeft: '12px', border: '1px solid #ddd', lineHeight: '42px'}}>{this.acceptedInvite(employee.invitation_accepted_at)}</div>
                </div>
                <div className='col s12 m6 l4' style={{marginBottom: '30px', paddingRight: '0px'}}><b>Joined SalesMend:</b> <br />
                  <div style={{fontSize: '18px', height: '42px', paddingLeft: '12px', border: '1px solid #ddd', lineHeight: '42px'}}>{this.joined(employee.invitation_accepted_at)}</div>
                </div>
                <div className='col s12'> </div>
                <div className='col s12'>
                  <input type='submit' className='btn' style={{backgroundColor: `${this.props.assignedcompany.accent_color}`, color: `${this.props.assignedcompany.accent_text}`}} value='Update'/> &nbsp;
                  <span className='btn' style={{backgroundColor: '#F53D3D'}} onClick={this.deleteEmployee}>Delete</span>
                </div>
              </form>

            </div>
        )
      }
    }
  }

  render() {
    return(
      <div className='row' style={{marginTop: '70px'}}>
        {this.display()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  let { user, assignedcompany, currentuser } = state
  return { user, assignedcompany, currentuser }
}

export default connect(mapStateToProps)(EmployeeInfo)
