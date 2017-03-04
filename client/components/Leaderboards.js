import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Leaderboards extends React.Component {
  constructor(props) {
    super(props)

    this.clearCurrent = this.clearCurrent.bind(this)
    this.clearCurrentRegion = this.clearCurrentRegion.bind(this)
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

  clearCurrent() {
    this.props.dispatch({type: 'REMOVE_CURRENT_REGION'})
    this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
  }

  clearCurrentRegion() {
    this.props.dispatch({type: 'REMOVE_CURRENT_REGION'})
    this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
    // this.props.dispatch({type: 'RESET_REGION_SALES'})
  }

  fontColor(param) {
    switch(param) {
      case "employees":
        if(document.location.pathname === "/leaderboards/employees") {
          return styles.onTabText
        } else {
          return styles.tabText
        }
        break;
      case "offices":
        if(document.location.pathname === "/leaderboards/offices") {
          return styles.onTabText
        } else {
          return styles.tabText
        }
      case "regions":
        if(document.location.pathname === "/leaderboards/regions") {
          return styles.onTabText
        } else {
          return styles.tabText
        }
        break;
      case "company":
        if(document.location.pathname === "/leaderboards/company") {
          return styles.onTabText
        } else {
          return styles.tabText
        }
    }
  }

  leaderboardTabs() {
    if(this.props.assignedcompany.id) {
      return(
          <div className="col s12 m10 offset-m1 l8 offset-l2" style={{marginTop: '13px'}}>
            <ul className="tabs tabs-fixed-width" style={{backgroundColor: 'gray'}}>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={{border: '1px solid #3a3b3a', borderRadius: '5px', backgroundColor: '#f2f7f7', boxShadow: 'inset 0 0 2px #3a3b3a'}}><Link className='admin' style={{color: '#555'}} onClick={this.clearCurrent} to='/leaderboards/employees'>Salesman</Link></li>
              </div>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={{border: '1px solid #3a3b3a', borderRadius: '5px', backgroundColor: '#f2f7f7', boxShadow: 'inset 0 0 2px #3a3b3a'}}><Link className='admin' style={{color: '#555'}} onClick={this.clearCurrentRegion} to='/leaderboards/offices'>Office</Link></li>
              </div>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={{border: '1px solid #3a3b3a', borderRadius: '5px', backgroundColor: '#f2f7f7', boxShadow: 'inset 0 0 2px #3a3b3a'}}><Link className='admin' style={{color: '#555'}} to='/leaderboards/regions'>Region</Link></li>
              </div>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={{border: '1px solid #3a3b3a', borderRadius: '5px', backgroundColor: '#f2f7f7', boxShadow: 'inset 0 0 2px #3a3b3a'}}><Link className='admin' style={{color: '#555'}} to='/leaderboards/company'>Company</Link></li>
              </div>
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
        <div style={{height: '75px', backgroundColor: 'gray', width: '100%'}}>
          {this.leaderboardTabs()}
        </div>
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
  onTab: {
    border: "1px solid #666",
    backgroundColor: "#999",
    margin: '5px',
    lineHeight: '42px',
    color: 'black',
    textShadow: '0 0 10px rgba(255,255,255,0.5), 0 1px #8cb7e8',
    // borderTopLeftRadius: '5px',
    // borderTopRightRadius: '5px',
    borderBottom: '6px solid black',
    boxShadow: 'inset 0 0 2px black',
    // borderRadius: '2px'
  },

}

const mapStateToProps = (state) => {
  let { assignedcompany } = state
  return { assignedcompany }
}

export default connect(mapStateToProps)(Leaderboards)
