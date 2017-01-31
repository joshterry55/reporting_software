import React from 'react';
import { Link } from 'react-router';

class Admin extends React.Component {
  constructor(props) {
    super(props)

  }

  display() {
    return(
      <Link to='/company'>Company</Link>
    )
  }

  render() {
    return(
      <div>
        Admin Page
        {this.display()}
      </div>
    )
  }
}


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

export default Admin
