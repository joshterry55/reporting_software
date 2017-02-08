import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Leaderboards extends React.Component {
  constructor(props) {
    super(props)
  }

  onPage(tab) {
    switch(tab) {
      case "employees":
        if(document.location.pathname === "/leaderboards/employees") {
          return styles.onTab
        } else {
          return styles.adminTab
        }
        break;
      case "offices":
        if(document.location.pathname === "/leaderboards/offices") {
          return styles.onTab
        } else {
          return styles.adminTab
        }
      case "regions":
        if(document.location.pathname === "/leaderboards/regions") {
          return styles.onTab
        } else {
          return styles.adminTab
        }
        break;
      case "company":
        if(document.location.pathname === "/leaderboards/company") {
          return styles.onTab
        } else {
          return styles.adminTab
        }
    }
  }

  leaderboardTabs() {
    if(this.props.assignedcompany.id) {
      return(
          <div className="col s12" style={{marginTop: '10px', backgroundColor: "#f2f7f7"}}>
            <ul className="tabs tabs-fixed-width" style={{backgroundColor: "#f2f7f7"}}>
              <li  className="tab col s3 admin-tabs" style={this.onPage("employees")}><Link style={styles.tabText} to='/leaderboards/employees'>Employees</Link></li>
              <li  className="tab col s3 admin-tabs" style={this.onPage("offices")}><Link style={styles.tabText} to='/leaderboards/offices'>Offices</Link></li>
              <li  className="tab col s3 admin-tabs" style={this.onPage("regions")}><Link style={styles.tabText} to='/leaderboards/regions'>Regions</Link></li>
              <li  className="tab col s3 admin-tabs" style={this.onPage("company")}><Link style={styles.tabText} to='/leaderboards/company'>Company</Link></li>
            </ul>
          </div>
      )
    } else {
      return(
          <div className="col s12">
            NO LEADERBOARDS
          </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.leaderboardTabs()}
      </div>
    )
  }
}

const styles = {
  adminTab: {
    background: "linear-gradient(#666, #333)",
    border: "1px solid #666",
		backgroundColor: "#999",
    margin: '5px',
    lineHeight: '42px',
    color: '#f2f7f7'
  },
  tabText: {
    textShadow: "0 0 10px rgba(0,0,0,0.75)",
    fontSize: '18px',
    color: '#f2f7f7'
  },
  topMargin: {
    marginTop: '5px'
  },
  onTab: {
    border: "1px solid #666",
    backgroundColor: "#CCC",
    margin: '5px',
    lineHeight: '42px',
    color: 'black',
    textShadow: '0 0 10px rgba(255,255,255,0.5), 0 1px #8cb7e8',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  },
  leftTab: {
    borderTopLeftRadius: '5px'
  }

}

const mapStateToProps = (state) => {
  let { assignedcompany } = state
  return { assignedcompany }
}

export default connect(mapStateToProps)(Leaderboards)
