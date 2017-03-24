import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Leaderboards extends React.Component {
  constructor(props) {
    super(props)

    this.clearCurrent = this.clearCurrent.bind(this)
    this.clearCurrentRegion = this.clearCurrentRegion.bind(this)
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

  highlightNav(tab) {
     switch(tab) {
       case "employees":
         if(document.location.pathname === "/leaderboards/employees") {
           return {
             backgroundColor: `#ccc`,
           }
         } else {
           return {backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`}
         }
         break;
      case "offices":
         if(document.location.pathname === "/leaderboards/offices") {
           return {
             backgroundColor: `#ccc`,
           }
         } else {
           return {backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`}
         }
       case "regions":
         if(document.location.pathname === "/leaderboards/regions") {
           return {
             backgroundColor: `#ccc`,

           }
         } else {
           return {backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`}
         }
         break;
       case "company":
         if(document.location.pathname === "/leaderboards/company") {
           return {
             backgroundColor: `#ccc`,
           }
         } else {
           return {backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`}
         }
     }
   }


  leaderboardTabs() {
    if(this.props.assignedcompany.id) {
      return(
          <div className="col s12 m10 offset-m1 l8 offset-l2" style={{marginTop: '10px'}}>
            <ul className="tabs tabs-fixed-width" style={{backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`}}>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('employees')}><Link className='admin' style={{color: '#fff'}} onClick={this.clearCurrent} to='/leaderboards/employees'>Salesman</Link></li>
              </div>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('offices')}><Link className='admin' style={{color: '#fff'}} onClick={this.clearCurrentRegion} to='/leaderboards/offices'>Office</Link></li>
              </div>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('regions')}><Link className='admin' style={{color: '#fff'}} to='/leaderboards/regions'>Region</Link></li>
              </div>
              <div className="tab col s3">
                <li  className="tab col s10 offset-s1 admin-tabs" style={this.highlightNav('company')}><Link className='admin' style={{color: '#fff'}} to='/leaderboards/company'>Company</Link></li>
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
        <div style={{height: '68px', backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`, width: '100%'}}>
          {this.leaderboardTabs()}
        </div>
      </div>
    )
  }
}

const styles = {
  leaderboardTab: {
    backgroundColor: '#f2f7f7',
  },
  leaderboardActiveTab: {
    border: '1px solid #3a3b3a',
    borderRadius: '5px',
    backgroundColor: '#ccc',
    boxShadow: 'inset 0 0 2px #3a3b3a'
  }
}


const mapStateToProps = (state) => {
  let { assignedcompany } = state
  return { assignedcompany }
}

export default connect(mapStateToProps)(Leaderboards)
