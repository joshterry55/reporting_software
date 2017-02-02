import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

class Admin extends React.Component {
  constructor(props) {
    super(props)

  }

  // display() {
  //   if(this.props.assignedcompany.id)
  //     return(
  //       <Link to='/company'>{this.props.assignedcompany.name}</Link>
  //     )
  //   else
  //     return(
  //       <Link to='/createcompany'>Create a Company</Link>
  //     )
  // }

  adminTabs() {
    if(this.props.assignedcompany.id) {
      return(
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li  className="tab col s3 admin-tabs"><Link to='/'>ADMIN</Link></li>
              <li  className="tab col s3 admin-tabs"><Link to='/company'>{this.props.assignedcompany.name}</Link></li>
            </ul>
          </div>
      )
    } else {
      return(
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li  className="tab col s3 admin-tabs"><Link to='/'>Home</Link></li>
              <li  className="tab col s3 admin-tabs"><Link to='/createcompany'>Company Setup</Link></li>
            </ul>
          </div>
      )
    }
  }

  render() {
    return(
      <div className='row container white-container'>
        {this.adminTabs()}
      </div>
    )
  }
}

// Admin Page
// {this.display()}


// inviteEmployee(e) {
// e.preventDefault();
// $.ajax({
//   url: '/users/invitation',
//   type: 'POST',
//   data: {
//     company_id: 4,
//     user: { email: this.refs.email.value,
//             first_name: this.refs.firstName.value,
//             last_name: this.refs.lastName.value }},
//   dataType: 'JSON'
// }).done( employee => {
//   let messageSuccess = `Invitation sent to ${employee.email}`
//   this.inviteForm.reset();
//   debugger
// }).fail( err => {
//   debugger
//   let message = "Email already exists";
// })
// }
//
// render() {
//   return(
//     <div>
//       Admin Page
//       <form ref={(input) => this.inviteForm = input} className='row center' onSubmit={this.inviteEmployee}>
//         <br />
//         <div className='col s6 offset-s3'>
//           <label>Select A Company</label>
//           <select ref='company' >
//             <option key={'1'} value={3}>TEST</option>
//           </select>
//           <input ref='firstName' type='text' required placeholder='Employee First Name' />
//           <input ref='lastName' type='text' required placeholder='Employee Last Name' />
//           <input ref='email' type='email' required placeholder='Employee Email' />
//           <input className='btn blue darken-3' type='submit' />
//         </div>
//       </form>
//     </div>
//   )
// }

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(Admin)
