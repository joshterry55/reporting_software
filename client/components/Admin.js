import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.setForm = this.setForm.bind(this)
  }

  // highlightNav(tab) {
  //    switch(tab) {
  //      case "addsale":
  //        if(document.location.pathname === "/addsale") {
  //          return styles.adminNavActiveTab
  //        } else {
  //          return styles.adminNavTab
  //        }
  //        break;
  //     case "company":
  //        if(document.location.pathname === "/company") {
  //          return styles.adminNavActiveTab
  //        } else {
  //          return styles.adminNavTab
  //        }
  //      case "settings":
  //        if(document.location.pathname === "/settings") {
  //          return styles.adminNavActiveTab
  //        } else {
  //          return styles.adminNavTab
  //        }
  //        break;
  //    }
  //  }

  highlightNav(tab) {
    let company = this.props.assignedcompany
    if(tab === 'addsale') {
      if(document.location.pathname === "/addsale") {
        return styles.adminNavActiveTab
      } else {

      }
    } else if(tab === 'company') {
      if(document.location.pathname === "/company") {
      return styles.adminNavActiveTab
      } else {
      }
    } else if(tab === 'settings') {
      if(document.location.pathname === "/settings") {
        return styles.adminNavActiveTab
      } else {
      }
    }
  }

  setForm() {
    this.props.dispatch({type: 'REMOVE_CURRENT_REGION'})
    this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
  }

  adminTabs() {
    if(this.props.assignedcompany.id) {
      return(
          <div className="col s12 m10 offset-m1 l8 offset-l2" style={{marginTop: '10px'}}>
            <ul className="tabs tabs-fixed-width" style={{backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`}}>
              <div className="tab col s3">
                <li className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('addsale')} onClick={this.setForm}><Link to='/addsale' className='admin' style={{color: `${this.props.assignedcompany.secondary_text}`}}>Add Sale</Link></li>
              </div>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('company')}><Link to='/company' className='admin' style={{color: `${this.props.assignedcompany.secondary_text}`}}>{this.props.assignedcompany.name}</Link></li>
              </div>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('settings')}><Link to='/settings' className='admin' style={{color: `${this.props.assignedcompany.secondary_text}`}}>Settings</Link></li>
              </div>
            </ul>
          </div>
      )
    } else {
      return(
          <div className="col s12" style={{marginTop: '10px', backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`}}>
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
      <div className='row' style={{marginBottom: '0px'}}>
        <div style={{height: '68px', backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`, width: '100%'}}>
          {this.adminTabs()}
        </div>
      </div>
    )
  }
}

const styles = {

  adminNavActiveTab: {
    backgroundColor: 'rgba(200,200,200,.30)',
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
