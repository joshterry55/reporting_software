import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

class AnnouncementsNav extends React.Component {
  constructor(props) {
    super(props)

  }

  highlightNav(tab) {
    if(tab === 'announcements') {
      if(document.location.pathname === "/announcements") {
        return styles.adminNavActiveTab
      } else {
        return styles.adminNavTab
      }
    } else if(tab === 'competitions') {
      if(document.location.pathname === "/competitions") {
      return styles.adminNavActiveTab
      } else {
        return styles.adminNavTab
      }
    }
  }

  announcementTabs() {
      return(
          <div className="col s12 m10 offset-m1 l8 offset-l2" style={{marginTop: '13px'}}>
            <ul className="tabs tabs-fixed-width" style={{backgroundColor: 'gray'}}>
              <div className="tab col s4">
                <li  className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('announcements')}><Link to='/announcements' className='admin' style={{color: '#555'}}>Announcements</Link></li>
              </div>
              <div className="tab col s4">
                <li className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('competitions')}><Link to='/competitions' className='admin' style={{color: '#555'}}>Competitions</Link></li>
              </div>
            </ul>
          </div>
      )
  }

  render() {
    return(
      <div className='row' style={{marginBottom: '0px'}}>
        <div style={{height: '75px', backgroundColor: 'gray', width: '100%'}}>
          {this.announcementTabs()}
        </div>
      </div>
    )
  }
}

const styles = {
  adminNavTab: {
    border: '1px solid #3a3b3a',
    borderRadius: '5px',
    backgroundColor: '#f2f7f7',
    boxShadow: 'inset 0 0 2px #3a3b3a'
  },
  adminNavActiveTab: {
    border: '1px solid #3a3b3a',
    borderRadius: '5px',
    backgroundColor: '#ccc',
    boxShadow: 'inset 0 0 2px #3a3b3a'
  }
}


const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(AnnouncementsNav)
