import React from 'react'
import {connect} from 'react-redux'


class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = { edit: false }

    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  submitEdittedCompany(e, id) {
    e.preventDefault()

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
        <span>Haven't accepted invite</span>
      )
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
              <div className='col s12 m8 l9 test-test' style={{backgroundColor: '#f27f7', minHeight: '500px', paddingLeft: '30px'}}>
                <div style={{marginBottom: '10px'}}><b>First Name:</b> {employee.first_name}</div>
                <div style={{marginBottom: '10px'}}><b>Last Name:</b> {employee.last_name}</div>
                <div style={{marginBottom: '10px'}}><b>Email:</b> {employee.email}</div>
                <div style={{marginBottom: '10px'}}><b>Phone Number:</b> {employee.phone_number ? employee.phone_number : 'None'}</div>
                <div style={{marginBottom: '10px'}}><b>Company Role:</b> {employee.role}</div>
                <div style={{marginBottom: '10px'}}><b>Invitation Sent:</b> {this.joinedDate(employee.invitation_sent_at)}</div>
                <div style={{marginBottom: '10px'}}><b>Invitation Accepted:</b> {this.acceptedInvite(employee.invitation_accepted_at)}</div>
                <div style={{marginBottom: '10px'}}><b>Joined SalesMend:</b> {this.joined(employee.invitation_accepted_at)}</div>
              </div>

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
