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
    this.highlightNav = this.highlightNav.bind(this)
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
    this.props.dispatch({type: 'RESET_TRAINING_CATEGORIES'})
    this.props.dispatch({type: 'RESET_TRAINING_SECTIONS'})
    this.props.dispatch({type: 'RESET_TRAINING_VIDEOS'})
    this.props.dispatch(logout(this.props.history))
  }

  // highlight(param) {
  //   switch(param) {
  //     case "Admin":
  //       if(document.location.pathname.includes('/admin')) {
  //         return styles.onTab
  //       } else {
  //         return styles.tab
  //       }
  //       break;
  //     case "Reports":
  //       if(document.location.pathname.includes('/report')) {
  //         return styles.onTab
  //       } else {
  //         return styles.tab
  //       }
  //       break;
  //     case "Training":
  //       if(document.location.pathname.includes('/training')) {
  //         return styles.onTab
  //       } else {
  //         return styles.tab
  //       }
  //       break;
  //     case "Leaderboard":
  //       if(document.location.pathname.includes('/leaderboard')) {
  //         return styles.onTab
  //       } else {
  //         return styles.tab
  //       }
  //       break;
  //     case "Announcements":
  //       if(document.location.pathname.includes('/announcement')) {
  //         return styles.onTab
  //       } else {
  //         return styles.tab
  //       }
  //       break;
  //
  //   }
  // }

  // $('#header-content li').on('click', function(){
  //    $(this).addClass('selected').siblings().removeClass('selected');
  //  });

  highlightNav(id) {
    $(`#${id}`).addClass('selectedNav').siblings().removeClass('selectedNav')
  }

  clearCurrent() {
    this.props.dispatch({type: 'REMOVE_CURRENT_REGION'})
    this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
    this.props.dispatch({type: 'RESET_OFFICE_SALES'})
  }

  navs() {
    switch(this.props.user.role) {
      case 'Employee':
        return(
          <div>
      <li onClick={() => this.highlightNav('employeeHome')} id="employeeHome"><Link to='/' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Home</Link></li>
            <li onClick={() => this.highlightNav('employeeAnnouncements')} id="employeeAnnouncements"><Link to='/announcements' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Announcements</Link></li>
            <li onClick={() => this.highlightNav('employeeCompetitions')} id="employeeCompetitions"><Link to='/competitions' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Competitions</Link></li>
            <li onClick={() => this.highlightNav('employeeLeaderboard')} id="employeeLeaderboard"><Link to='/leaderboards/employees' onClick={this.clearCurrent} style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Leaderboard</Link></li>
            <li onClick={() => this.highlightNav('employeeTrainings')} id="employeeTrainings"><Link to='/trainings' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Training</Link></li>
            <li onClick={() => this.highlightNav('employeeReports')} id="employeeReports"><Link to='/reports' onClick={this.clearCurrent} style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Reports</Link></li>
            <li onClick={() => this.highlightNav('employeePage')} id="employeePage"><Link to='/employee' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>{`${this.props.user.first_name}`}</Link></li>
            <li onClick={() => this.highlightNav('announcements')} id="announcements"><a onClick={this.logout} style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Logout</a></li>
          </div>
        )
      case 'Admin':
      return(
        <div>
          <li onClick={() => this.highlightNav('home')} id="home"><Link to='/' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Home</Link></li>
          <li className='off-tab' onClick={() => this.highlightNav('announcements')} id="announcements"><Link to='/announcements' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Announcements</Link></li>
          <li className='off-tab' onClick={() => this.highlightNav('competitions')} id="competitions"><Link to='/competitions' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Competitions</Link></li>
          <li className='off-tab' onClick={() => this.highlightNav('leaderboard')} id="leaderboard"><Link to='/leaderboards/employees' onClick={this.clearCurrent} style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Leaderboard</Link></li>
          <li className='off-tab' onClick={() => this.highlightNav('trainings')} id="trainings"><Link to='/trainings' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Training</Link></li>
          <li className='off-tab' onClick={() => this.highlightNav('reports')} id="reports"><Link to='/reports' onClick={this.clearCurrent} style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Reports</Link></li>
          <li className='off-tab' onClick={() => this.highlightNav('company')} id="company"><Link to='/company' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Admin</Link></li>
          <li className='off-tab' onClick={() => this.highlightNav('employee')} id="employee"><Link to='/employeeselect' style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}}>Reps</Link></li>
          <li><a style={{color: `${this.props.assignedcompany.color_text}`, cursor: 'pointer'}} onClick={this.logout}>Logout</a></li>
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
    let navColor
    if(this.props.assignedcompany.id) {
      navColor = this.props.assignedcompany.color
    } else {
      navColor = '#354458'
    }
    return(
      <div>
        <nav id='top-nav' style={{zIndex: '999', position: 'relative', backgroundColor: `${navColor}`}}>
          <div className='nav-wrapper'>
            <Link to='/' className='brand-logo'><span style={{marginLeft: '14px', marginTop: '12px'}} className="nav-logo"></span><span className="logo-text"></span></Link>
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

// 3EB6D1 -- light blue/green
// 008BBA -- royal blue
// 364150 -- current one
// 354458 -- almost same dark blue as current
// 3A9AD9 -- works with blue above
// 53BBF4 -- another light blue to test
// 53BBF4 -- almost the same as our light blue
// 0C98CF -- i dont hate this one

const styles = {
  adminTab: {
    background: "linear-gradient(#666, #333)",
    border: "1px solid #666",
		backgroundColor: "#999",
    margin: '5px',
    lineHeight: '42px',
    color: '#f2f7f7',
    borderBottom: '6px solid #999',
  },
  onTabText: {
    textShadow: "0 0 10px rgba(0,0,0,1)",
    fontSize: '18px',
    color: '#f2f7f7'
  },
  tabText: {
    textShadow: "0 0 10px rgba(0,0,0,0.75)",
    fontSize: '18px',
    color: '#f2f7f7'
  },
  textShadow: {
    textShadow: '1px 1px 1px rgba(0,0,0,0.35)', cursor: 'pointer'
  }
  // onTab: {
  //   backgroundColor: '#5AA8D1'
  // },
  // tab: {
  //   backgroundColor: '#60b9e8'
  // },

}

const mapStateToProps = (state) => {
	let { user, assignedcompany } = state;
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(NavBar);
