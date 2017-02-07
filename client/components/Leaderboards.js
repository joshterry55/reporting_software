import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Leaderboards extends React.Component {
  constructor(props) {
    super(props)
  }

  leaderboardTabs() {
    if(this.props.assignedcompany.id) {
      return(
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li  className="tab col s3 admin-tabs"><Link to='/leaderboards/employees'>Employees</Link></li>
              <li  className="tab col s3 admin-tabs"><Link to='/leaderboards/offices'>Offices</Link></li>
              <li  className="tab col s3 admin-tabs"><Link to='/leaderboards/regions'>Regions</Link></li>
              <li  className="tab col s3 admin-tabs"><Link to='/leaderboards/company'>Company</Link></li>
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

const mapStateToProps = (state) => {
  let { assignedcompany } = state
  return { assignedcompany }
}

export default connect(mapStateToProps)(Leaderboards)
