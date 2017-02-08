import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { logout, login } from '../actions/auth';
import Flash from '../components/Flash';



class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.navs = this.navs.bind(this)
    this.logout = this.logout.bind(this)
    this.clearCurrent = this.clearCurrent.bind(this)
  }

  logout(e) {
    e.preventDefault()
    browserHistory.push('/')
    this.props.dispatch({type: 'RESET_ASSIGNED_COMPANY'})
    this.props.dispatch({type: 'RESET_ASSIGNED_REGION'})
    this.props.dispatch({type: 'RESET_ASSIGNED_OFFICE'})
    this.props.dispatch({type: 'REMOVE_CURRENT_REGION'})
    this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
    this.props.dispatch({type: 'RESET_EMPLOYEE'})
    this.props.dispatch(logout(this.props.history))
  }

  clearCurrent() {
    this.props.dispatch({type: 'REMOVE_CURRENT_REGION'})
    this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
  }

  navs() {
    switch(this.props.user.role) {
      case 'Employee':
        return(
          <div>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/announcements'>Announcements</Link></li>
            <li><Link to='/leaderboards/employees' onClick={this.clearCurrent}>Boards</Link></li>
            <li><Link to='/trainings'>Training</Link></li>
            <li><Link to='/employee'>{`${this.props.user.first_name}`}</Link></li>
            <li><a style={{ cursor: 'pointer'}} onClick={this.logout}>Logout</a></li>
          </div>
        )
      case 'Admin':
      return(
        <div>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/announcements'>Announcements</Link></li>
          <li><Link to='/leaderboards/employees' onClick={this.clearCurrent}>Boards</Link></li>
          <li><Link to='/trainings'>Training</Link></li>
          <li><Link to='/reports' onClick={this.clearCurrent}>Reports</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><a style={{ cursor: 'pointer'}} onClick={this.logout}>Logout</a></li>
        </div>
      )
      default:
      return(
        <div>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/signin'>Signin</Link></li>
          <li><Link to='/'>About</Link></li>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <nav id='top-nav' style={{zIndex: '999', position: 'relative', backgroundColor: '#60b9e8'}}>
          <div className='nav-wrapper'>
            <Link to='/' className='brand-logo'><span className="logo-text">Reports</span> <span className="little-bee"></span></Link>
            <a href='#' data-activates='mobile' className='button-collapse'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {this.navs()}
            </ul>
            <ul className='side-nav' id='mobile'>
              {this.navs()}
            </ul>
          </div>
        </nav>
        <div id="flashContainer" style={{position: 'fixed', top:'64px', width: '100%', opacity: '0.85', textAlign: 'center', zIndex:'999'}}>
          <Flash />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	let { user, assignedcompany } = state;
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(NavBar);
